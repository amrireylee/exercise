package com.fzk.exercise.manage.common;


import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.ser.CustomSerializerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component("customObjectMapper")
public class CustomObjectMapper  extends ObjectMapper {
    public CustomObjectMapper() {
        CustomSerializerFactory factory = new CustomSerializerFactory();
        factory.addGenericMapping(Date.class, new JsonSerializer<Date>() {

            @Override
            public void serialize(Date arg0, JsonGenerator arg1,
                                  SerializerProvider arg2) throws IOException,
                    JsonProcessingException {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                arg1.writeString(sdf.format(arg0));
            }

        });
        this.setSerializerFactory(factory);
    }

}
