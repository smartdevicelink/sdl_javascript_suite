async function allRpcs () {
    const appId = 'all-rpcs';

    const lifecycleConfig = new SDL.manager.LifecycleConfig()
        .setAppId(appId)
        .setAppName(appId)
        .setLanguageDesired(SDL.rpc.enums.Language.EN_US)
        .setAppTypes([
            SDL.rpc.enums.AppHMIType.MEDIA,
            SDL.rpc.enums.AppHMIType.REMOTE_CONTROL,
        ])
        .setTransportConfig(new SDL.transport.WebSocketClientConfig('ws://localhost', 5050));

    const app = new HelloSdl() // since these are going to be invalid rpcs, do not count any of the messages sent towards coverage
        .setLifecycleConfig(lifecycleConfig);

    await app.start(); // after this point, we are in HMI FULL and managers are ready
    const sdlManager = app.getManager();

    console.log('Sending a bunch of requests just to see if a response is returned.');

    // RECEIVE RESPONSE TESTS

    for (const rpc in SDL.rpc.messages) {
        const rpcInstance = new SDL.rpc.messages[rpc]();
        // skip notification and response RPCs
        if (rpcInstance.getMessageType() === SDL.rpc.enums.MessageType.response
            || rpcInstance.getMessageType() === SDL.rpc.enums.MessageType.notification) {
            continue;
        }

        const FunctionID = SDL.rpc.enums.FunctionID;

        if (rpcInstance.getFunctionId() === FunctionID.keyForValue(FunctionID.RegisterAppInterface) ||
            rpcInstance.getFunctionId() === FunctionID.keyForValue(FunctionID.UnregisterAppInterface) ||
            rpcInstance.getFunctionId() === FunctionID.keyForValue(FunctionID.CloseApplication)) {
            continue;
        }

        // show updates to this test
        const show = new SDL.rpc.messages.Show()
            .setMainField1('Testing')
            .setMainField2(rpc);
        await sdlManager.sendRpcResolve(show);

        const response = await sdlManager.sendRpcResolve(rpcInstance);

        if (!(response instanceof SDL.rpc.RpcResponse)) {
            console.error(response);
            throw new Error(`${rpc} response not correct!`);
        }
    }

    // invoke the onPacketReceived method in the transport layer to simulate receiving notifications and request packets
    // RECEIVE NOTIFICATION AND REQUEST TESTS
    for (const rpc in SDL.rpc.messages) {
        const rpcInstance = new SDL.rpc.messages[rpc]();
        // skip response RPCs
        if (rpcInstance.getMessageType() === SDL.rpc.enums.MessageType.response) {
            continue;
        }

        // build out an SdlPacket from the RPC
        const protocolLayer = sdlManager._lifecycleManager._sdlSession._sdlProtocol;
        const sessionId = protocolLayer._getSessionId();
        const messageId = protocolLayer._getNextMessageID();
        const mtu = protocolLayer._mtus[SDL.protocol.enums._ServiceType.RPC];
        const version = protocolLayer._protocolVersion.getMajor();
        const isEncrypted = rpcInstance.isPayloadProtected();

        // show updates to this test
        const show = new SDL.rpc.messages.Show()
            .setMainField1('Testing')
            .setMainField2(rpc);
        await sdlManager.sendRpcResolve(show);

        const sdlPacket = await new Promise((resolve, reject) => {
            SDL.protocol._MessageFrameDisassembler.buildRPC(rpcInstance, sessionId, messageId, mtu, version, isEncrypted, resolve);
        });

        // listen for the notification or request
        const listenPromise = rpcListenPromise(sdlManager, SDL.rpc.enums.FunctionID[rpc]);
        // "send" the packet
        sdlManager._lifecycleManager._sdlSession._sdlProtocol._transportManager.onPacketReceived(sdlPacket);
        const rpcReceived = await listenPromise;

        if (!(rpcReceived instanceof SDL.rpc.RpcNotification) && !(rpcReceived instanceof SDL.rpc.RpcRequest)) {
            console.error(rpcReceived);
            throw new Error(`${rpc} rpc received not correct!`);
        }
    }

    console.log('Finished sending the rpcs');

    // send CloseApplication last
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.CloseApplication());

    // tear down the app
    await sdlManager.sendRpcResolve(new SDL.rpc.messages.UnregisterAppInterface());
    sdlManager.dispose();

    function rpcListenPromise (sdlManager, functionId) {
        return new Promise((resolve, reject) => {
            const listener = (message) => {
                sdlManager.removeRpcListener(functionId, listener);
                resolve(message);
            };
            sdlManager.addRpcListener(functionId, listener);
        });
    }

    function sleep (timeout = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
}