package com.esc.rtserver.services;

import com.esc.rtserver.Dao.UserDao;
import com.esc.rtserver.entities.User;
import com.esc.rtserver.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticateService {

    @Autowired
    private LdapService ldapService;

    @Autowired
    private UserDao userDao;

//    @Autowired
//    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean doAuthenticate(String email,String password)
    {
        boolean isAuthenticated = false;

        // Checks if the user is an internal user or external user
        // AD authentication is done if user is internal and normal
        // db email and password check is done if the user is external
        if(email.toLowerCase().contains("@ecobank.com")){
            boolean isLdapAuthenticated = ldapService.authenticate(email, password);
            if(isLdapAuthenticated){
                // Checks if user is on the db
                // Update user info the db
                Optional<User> user = userDao.findByEmailIgnoreCase(email);
                if(user.isPresent()){
                    isAuthenticated = true;
                }
                else{
                    isAuthenticated = false;
                }
            }
        }
         else {
           isAuthenticated = dbAuthentication(email,password);
        }

        return isAuthenticated;
    }

    private boolean dbAuthentication(String email,String password){
        Optional<User> user = userDao.findByEmailIgnoreCase(email);
        if(!user.isPresent()){
            return false;
        }
        return passwordEncoder.matches(password,user.get().getPassword());
    }


//    public Response sendMailOnLogin(String firstName, String email){
//       string firstname: firstName of logged in user
//          string email: email of logged in user
//        String fileName = "resetpasswordmail";
//        String htmlTemplate = userService.getDefaultHtmlTemplate(firstName, fileName);
//
//        return userService.passwordResetFlag(email, htmlTemplate);
//    }
}
