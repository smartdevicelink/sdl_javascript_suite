{% extends 'base_template.js' %}

{%- block imports %}
// messages
{{-super()}}
// other
import { MessageType } from './enums/MessageType.js';
import { FunctionID } from './enums/FunctionID.js';
import { _JsonRpcMarshaller } from './../util/_JsonRpcMarshaller.js';
import { _BinaryFrameHeader } from './../protocol/_BinaryFrameHeader.js';
{% endblock -%}
{%- block body %}
    /**
     * Converts an _SdlPacket to an RpcMessage
     * @param {_SdlPacket} sdlPacket - An _SdlPacket to convert.
     * @returns {RpcMessage} - The constructed RpcMessage.
     */
    static construct (sdlPacket) {
        const payload = sdlPacket.getPayload();
        const binaryFrameHeader = _BinaryFrameHeader.fromBinaryHeader(payload);

        let message;
        const messageType = binaryFrameHeader.getMessageType();
        const rpcName = MessageType.keyForValue(messageType);
        const correlationId = binaryFrameHeader.getCorrelationId();
        const functionId = binaryFrameHeader.getFunctionId();
        const functionName = FunctionID.keyForValue(functionId);
        const bulkData = binaryFrameHeader.getBulkData();
        const jsonData = binaryFrameHeader.getJsonData();
        const params = {};
        // not-empty object check
        if (Object.keys(jsonData).length !== 0) {
            params.parameters = _JsonRpcMarshaller.unmarshall(jsonData);
        }

        switch (functionId) {
            {%- for item in cases %}
            case FunctionID.{{item.function_name}}:
                if (messageType === MessageType.{{item.type|lower}}) {
                    message = new {{item.class_name}}(params);
                }{% if item.type == 'REQUEST' %} else if (messageType === MessageType.response) {
                    message = new {{item.class_name}}Response(params);
                }
                {%- endif %}
                break;
            {%- endfor %}
            default:
                message = null;
        }

        if (message === null || message === undefined) { // informs of missing classes
            console.warn(`RpcCreator couldn't construct an RPC for the ${functionName} ${rpcName}`);
            return null;
        }

        if (messageType === MessageType.request || messageType === MessageType.response) {
            message.setCorrelationId(correlationId);
        }
        if (bulkData) {
            message.setBulkData(bulkData);
        }

        return message;
    }
{% endblock -%}