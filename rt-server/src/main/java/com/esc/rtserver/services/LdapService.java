package com.esc.rtserver.services;


import com.esc.rtserver.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.filter.AndFilter;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@SuppressWarnings("Duplicates")
public class LdapService {

    private final Logger logger = LoggerFactory.getLogger(LdapService.class);

    @Autowired
    private LdapTemplate ldapTemplate;

    @Autowired
    private UserService userService;


    public User searchByEmail(String email) {
        String emailAddr = email.toLowerCase();
        List<User> search = ldapTemplate
                .search(
                        "",
                        "(mail=" + emailAddr + ")",
                        (javax.naming.directory.Attributes attributes) -> {
                                User user = new User();
                                user.setUserName((String) attributes.get("sAMAccountName").get());
                                user.setFirstName((String) attributes.get("givenName").get());
                                user.setLastName((String) attributes.get("sn").get());
                                user.setEmail((String) attributes.get("mail").get());
                                user.setDepartment((String) (attributes.get("department") != null ? attributes.get("department").get() : ""));
                                user.setAffiliate((String) (attributes.get("company") != null ? attributes.get("company").get() :"" ));
                                return user;
                            }
                );
        if(search.size() > 0 ){
            return search.get(0);
        } else {
            return null;
        }

    }

    public boolean authenticate(String email, String password){
        User user = searchByEmail(email);
        boolean authenticate = false;
        if (user != null){
            String username = user.getUserName().toLowerCase();
            AndFilter filter = new AndFilter();
            filter.and(new EqualsFilter("sAMAccountName", username));
            authenticate = ldapTemplate.authenticate("", filter.encode(), password);
            logger.info("LDAP Authentication Result : "+ authenticate);
//            userService.createUser(user);
        }
        return authenticate;

    }

    public User genericSearch(String username){
        List<User> search = ldapTemplate
                .search(
                        "",
                        "(sAMAccountName=" + username + ")"
                        ,
                        new AttributesMapper<User>() {
                            @Override
                            public User mapFromAttributes(javax.naming.directory.Attributes attributes) throws javax.naming.NamingException {
                                User user = new User();
                                user.setUserName((String) attributes.get("sAMAccountName").get());
                                user.setFirstName((String) attributes.get("givenName").get());
                                user.setLastName((String) attributes.get("sn").get());
                                user.setEmail((String) attributes.get("mail").get());
                                user.setDepartment((String) (attributes.get("department") != null ? attributes.get("department").get() : ""));
                                user.setAffiliate((String) (attributes.get("company") != null ? attributes.get("company").get() :"" ));
                                return user;
                            }
                        }
                );
        if(search.size() > 0 ){
            return search.get(0);
        } else {
            search = ldapTemplate
                    .search(
                            "",
                            // (sAMAccountName=gkasumu)
                            "(mail=" + username+"@ecobank.com" + ")"
                            ,
                            new AttributesMapper<User>() {
                                @Override
                                public User mapFromAttributes(javax.naming.directory.Attributes attributes) throws javax.naming.NamingException {
                                    User user = new User();
                                    user.setUserName((String) attributes.get("sAMAccountName").get());
                                    user.setFirstName((String) attributes.get("givenName").get());
                                    user.setLastName((String) attributes.get("sn").get());
                                    user.setEmail((String) attributes.get("mail").get());
                                    user.setDepartment((String) (attributes.get("department") != null ? attributes.get("department").get() : ""));
                                    user.setAffiliate((String) (attributes.get("company") != null ? attributes.get("company").get() :"" ));
                                    return user;
                                }
                            }
                    );
            if(search.size() > 0 ){
                return search.get(0);
            } else {
                return null;
            }
        }
    }
}
