package com.esc.rtserver.utilities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Component
public class TemplateUtil {

    public static void main(String[] args) {
        TemplateUtil util = new TemplateUtil();
        System.out.println(util.generateMailHtml("Hello Im here"));
    }

    @Autowired
    TemplateEngine templateEngine;

    public String generateMailHtml(String text)
    {
//        Map<String, Object> variables = new HashMap<>();
//        variables.put("mailtext", text);

        final Context ctx = new Context(Locale.getDefault());
        ctx.setVariable("mailtext", text);
        final String templateFileName = "defaultpasswordmail"; //Name of the template file without extension
        String output = this.templateEngine.process(templateFileName, ctx);

        System.out.println(output);

        return output;
    }
}
