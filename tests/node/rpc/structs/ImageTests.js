const SDL = require('./../../../../lib/js/dist/SDL');
const Image = SDL.rpc.structs.Image;

const Test = require('./../../../Test.js');
const Validator = require('./../../../Validator.js');
const assertTrue = Validator.assertTrue.bind(Validator);
const assertEquals = Validator.assertEquals.bind(Validator);
const assertNull = Validator.assertNull.bind(Validator);
const assertNotNull = Validator.assertNotNull.bind(Validator);

let msg;

describe('ImageTests', function () {
    it('setup', function (done) {
        msg = new Image();
        msg.setImageType(Test.GENERAL_IMAGETYPE);
        msg.setValue(Test.GENERAL_STRING);
        msg.setIsTemplate(Test.GENERAL_BOOLEAN);
        done();
    });

    it('testRpcValues', function (done) {
        // Test Values
        const imageType = msg.getImageType();
        const value = msg.getValue();
        const isTemplate = msg.getIsTemplate();
        
        // Valid Tests
        assertEquals(Test.MATCH, Test.GENERAL_IMAGETYPE, imageType);
        assertEquals(Test.MATCH, Test.GENERAL_STRING, value);
        assertEquals(Test.MATCH, Test.GENERAL_BOOLEAN, isTemplate);
        
        // Invalid/Null Tests
        msg = new Image();
        assertNotNull(Test.NOT_NULL, msg);
        assertNull(Test.NULL, msg.getImageType());
        assertNull(Test.NULL, msg.getValue());
        assertNull(Test.NULL, msg.getBulkData());
        assertNull(Test.NULL, msg.getIsTemplate());
        done();
    });



    // TODO missing test for listing of all possible enums?
});


// package com.smartdevicelink.test.rpc.datatypes;

// import com.smartdevicelink.proxy.rpc.Image;
// import com.smartdevicelink.proxy.rpc.enums.ImageType;
// import com.smartdevicelink.test.JsonUtils;
// import com.smartdevicelink.test.Test;

// import junit.framework.TestCase;

// import org.json.JSONException;
// import org.json.JSONObject;

// import java.util.Iterator;

// /**
//  * This is a unit test class for the SmartDeviceLink library project class : 
//  * {@link com.smartdevicelink.rpc.Image}
//  */
// public class ImageTests extends TestCase{

//     private Image msg;

//     @Override
//     public void setUp(){

//     }

//     /**
// 	 * Tests the expected values of the RPC message.
// 	 */
//     public void testRpcValues () {

//     }

//     public void testJson(){
//         JSONObject reference = new JSONObject();

//         try{
//             reference.put(Image.KEY_IMAGE_TYPE, Test.GENERAL_IMAGETYPE);
//             reference.put(Image.KEY_VALUE, Test.GENERAL_STRING);
//             reference.put(Image.KEY_IS_TEMPLATE, Test.GENERAL_BOOLEAN);

//             JSONObject underTest = msg.serializeJSON();
//             assertEquals(Test.MATCH, reference.length(), underTest.length());

//             Iterator<?> iterator = reference.keys();
//             while(iterator.hasNext()){
//                 String key = (String) iterator.next();
//                 assertEquals(Test.MATCH, JsonUtils.readObjectFromJsonObject(reference, key), JsonUtils.readObjectFromJsonObject(underTest, key));
//             }
//         }catch(JSONException e){
//         	fail(Test.JSON_FAIL);
//         }
//     }
// }