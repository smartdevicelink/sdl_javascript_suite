{% extends 'base_template.js' %}

{%- block imports %}
// messages
{{-super()}}
// other
import { RpcType } from './enums/RpcType.js';
import { FunctionID } from './enums/FunctionID.js';
import { JsonRpcMarshaller } from './../util/JsonRpcMarshaller.js';
import { BinaryFrameHeader } from './../protocol/BinaryFrameHeader.js';
{% endblock -%}
{%- block body %}
    /**
     * Converts an SdlPacket to an RpcMessage
     * @param {SdlPacket} sdlPacket - An SdlPacket to convert.
     * @returns {RpcMessage} - The constructed RpcMessage.
     */
    static construct (sdlPacket) {
        const payload = sdlPacket.getPayload();
        const binaryFrameHeader = BinaryFrameHeader.fromBinaryHeader(payload);

        let message;
        const rpcType = binaryFrameHeader.getRpcType();
        const rpcName = RpcType.keyForValue(rpcType);
        const correlationId = binaryFrameHeader.getCorrelationId();
        const functionId = binaryFrameHeader.getFunctionId();
        const functionName = FunctionID.keyForValue(functionId);
        const bulkData = binaryFrameHeader.getBulkData();
        const jsonData = binaryFrameHeader.getJsonData();
        const params = {};
        // not-empty object check
        if (Object.keys(jsonData).length !== 0) {
            params.parameters = JsonRpcMarshaller.unmarshall(jsonData);
        }

        switch (functionId) {
            {%- for item in cases %}
            case FunctionID.{{item.function_name}}:
                if (rpcType === RpcType.{{item.type}}) {
                    message = new {{item.class_name}}(params);
                }{% if item.type == 'REQUEST' %} else if (rpcType === RpcType.RESPONSE) {
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

        if (rpcType === RpcType.REQUEST || rpcType === RpcType.RESPONSE) {
            message.setCorrelationId(correlationId);
        }
        if (bulkData) {
            message.setBulkData(bulkData);
        }

        return message;
    }
{% endblock -%}