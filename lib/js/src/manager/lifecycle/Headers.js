import { RpcStruct } from '../../../../js/src/rpc/RpcStruct.js';

/**
 * @since SmartDeviceLink 3.0
 */

class Headers extends RpcStruct {
    /**
     * Constructs a new object indicated by the JSON
     * parameter
     *
     * @param {Object} parameters - The JSON to use
     */
    constructor (parameters) {
        super(parameters);
    }

    setContentType (contentType) {
        this.setParameter(Headers.KEY_CONTENT_TYPE, contentType);
        return this;
    }

    getContentType () {
        return this.getParameter(Headers.KEY_CONTENT_TYPE);
    }

    setConnectTimeout (connectionTimeout) {
        this.setParameter(Headers.KEY_CONNECT_TIMEOUT, connectionTimeout);
        return this;
    }

    getConnectTimeout () {
        return this.getParameter(Headers.KEY_CONNECT_TIMEOUT);
    }

    setDoOutput (doOutput) {
        this.setParameter(Headers.KEY_DO_OUTPUT, doOutput);
        return this;
    }

    getDoOutput () {
        return this.getParameter(Headers.KEY_DO_OUTPUT);
    }

    setDoInput (doInput) {
        this.setParameter(Headers.KEY_DO_INPUT, doInput);
        return this;
    }

    getDoInput () {
        return this.getParameter(Headers.KEY_DO_INPUT);
    }

    setUseCaches (usesCaches) {
        this.setParameter(Headers.KEY_USE_CACHES, usesCaches);
        return this;
    }

    getUseCaches () {
        return this.getParameter(Headers.KEY_USE_CACHES);
    }

    setRequestMethod (requestMethod) {
        this.setParameter(Headers.KEY_REQUEST_METHOD, requestMethod);
        return this;
    }

    getRequestMethod () {
        return this.getParameter(Headers.KEY_REQUEST_METHOD);
    }


    setReadTimeout (readTimeout) {
        this.setParameter(Headers.KEY_READ_TIMEOUT, readTimeout);
        return this;
    }

    getReadTimeout () {
        return this.getParameter(Headers.KEY_READ_TIMEOUT);
    }

    setInstanceFollowRedirects (instanceFollowRedirects) {
        this.setParameter(Headers.KEY_INSTANCE_FOLLOW_REDIRECTS, instanceFollowRedirects);
        return this;
    }

    getInstanceFollowRedirects () {
        return this.getParameter(Headers.KEY_INSTANCE_FOLLOW_REDIRECTS);
    }

    setCharset (charset) {
        this.setParameter(Headers.KEY_CHARSET, charset);
        return this;
    }

    getCharset () {
        return this.getParameter(Headers.KEY_CHARSET);
    }

    setContentLength (contentLength) {
        this.setParameter(Headers.KEY_CONTENT_LENGTH, contentLength);
        return this;
    }

    getContentLength () {
        return this.getParameter(Headers.KEY_CONTENT_LENGTH);
    }
}
Headers.KEY_CONTENT_TYPE = 'ContentType';
Headers.KEY_CONNECT_TIMEOUT = 'ConnectTimeout';
Headers.KEY_DO_OUTPUT = 'DoOutput';
Headers.KEY_DO_INPUT = 'DoInput';
Headers.KEY_USE_CACHES = 'UseCaches';
Headers.KEY_REQUEST_METHOD = 'RequestMethod';
Headers.KEY_READ_TIMEOUT = 'ReadTimeout';
Headers.KEY_INSTANCE_FOLLOW_REDIRECTS = 'InstanceFollowRedirects';
Headers.KEY_CHARSET = 'charset';
Headers.KEY_CONTENT_LENGTH = 'Content-Length';

export { Headers };