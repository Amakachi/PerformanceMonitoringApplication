package com.esc.rtserver.services;

import com.esc.rtserver.Dao.RoleDao;
import com.esc.rtserver.Dao.TokenDAO;
import com.esc.rtserver.Dao.UserDao;
import com.esc.rtserver.entities.Role;
import com.esc.rtserver.entities.Token;
import com.esc.rtserver.entities.User;
import com.esc.rtserver.models.*;
import com.esc.rtserver.util.MailAgent;
import com.esc.rtserver.utilities.Cryptography;
import com.google.gson.Gson;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


import javax.transaction.Transactional;
import java.net.URI;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService {

    @Autowired
    Environment env;

    @Autowired
    Cryptography cryptography;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MailAgent mailAgent;

    @Autowired
    TemplateEngine templateEngine;


    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private TokenDAO tokenDAO;

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private LdapService ldapService;

    @Autowired
    private Gson gson;


    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    /**+
     * Find all users
     * @return a List of Users
     */
    public List<User> findAllUsers() {
        return userDao.findAllByRejectStatusOrderByCreationDateDesc("N");
    }


    /**+
     *
     * @param user
     * @return
     */
    public Response createUser(User user) {
        Response resp = new Response();
        try {
            Optional<User> byEmail = userDao.findByEmailIgnoreCase(user.getEmail());
            if (byEmail.isPresent()) {
                byEmail.get().setEmail(user.getEmail());
                byEmail.get().setPassword(user.getPassword());
                byEmail.get().setPassword(passwordEncoder.encode(user.getPassword()));
                byEmail.get().setFirstName(user.getFirstName());
                byEmail.get().setLastName(user.getLastName());
                userDao.save(byEmail.get());
            } else {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
//                Set<Role> roles = Stream.of(user.setRole())
//                        .collect(Collectors.toCollection(HashSet::new));
//
//                user.setRoles(roles);

                userDao.save(user);
            }
            resp.setResponseMessage(messageSource.getMessage("entity.savedmodified.success", null, LocaleContextHolder.getLocale()));
            resp.setResponseCode("000");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage(messageSource.getMessage("entity.savedmodified.failed", new String[]{e.getMessage()}, LocaleContextHolder.getLocale()));
        }
        return resp;
    }

    /**+
     * Sets session values
     * @return
     */
    public Optional<User> setSessionValues() {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //User search = ldapService.search(principal);
//        logger.info("Getting Session Variables : "+ getSessionVariables());
        return userDao.findByEmailIgnoreCase(principal);
    }

    public User getSessionVariables() {
        CustomUserDetails userDetails = userDetailService.loadUserByUsername((String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal());
        return userDetails.getUser();
    }

    /**+
     * Find a user by email
     * @param email
     * @return
     */
    public List<User> findUserByEmail(String email) {
        return userDao.findUsersByEmail(email);
    }

    //    public List<User> fetchOtherUsers() {
//        return userDao.findByUserNameIsNotIgnoreCaseAndApprovalStatusOrderByUserNameAsc(getSessionVariables().getUserName(), "Y");
//    }
//
//    public List<User> fetchUsers() {
//        return userDao.findAllByOrderByUserNameAsc();
//    }
//

    /**+
     * Fetch a user from AD
     * @param email
     * @return a response class
     */
    public Response fetchADUser(String email) {
        Response resp = new Response();
        try {
            User search = ldapService.searchByEmail(email);
            if (search != null) {
                resp.setData(search);
                resp.setResponseCode("000");
                resp.setResponseMessage("Search Successful");
            } else {
                resp.setResponseCode("999");
                resp.setResponseMessage("Not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage("Search failed");
        }

        return resp;

    }

    /**+
     *
     * @param email
     * @return
     */
    public List<User> fetchUserFromDB(String email) {
        List<User> dbUser = userDao.findUsersByEmail(email);
        return dbUser;
    }


    /**+
     * Create a new user, assign role.
     * Send mail
     * @param customUserRequest
     * @return
     */
    public Response createCustomUser(CustomUserRequest customUserRequest) {
        Response resp = new Response();

        System.out.println(customUserRequest.getAccessRight());

        User user = new User();
        try {
            Optional<User> byEmail = userDao.findByEmailIgnoreCase(customUserRequest.getEmail());

            if (userDao.findByEmailAndRejectStatus(customUserRequest.getEmail(), "Y").isPresent()) {
                resp.setResponseMessage("User already exists and reject status is rejected, check details in view user table");
                resp.setResponseCode("777");
            } else if (byEmail.isPresent()) {
                resp.setResponseMessage("User already exists");
                resp.setResponseCode("666");
            } else {
                System.out.println(gson.toJson(customUserRequest.getAccessRight()));
                System.out.println(customUserRequest.getPhoneNumber());
                System.out.println(customUserRequest.getContactAddress());

                Set<Role> roles = new HashSet<Role>();
                roles.add(new Role(customUserRequest.getAccessiblePartners() + "." + customUserRequest.getRole(),
                        gson.toJson(customUserRequest.getAccessRight())));

                User users = new User("", "N", "N", "N",
                        customUserRequest.getFirstName(), customUserRequest.getLastName(),
                        customUserRequest.getEmail(),
                        "", customUserRequest.getPhoneNumber(), customUserRequest.getContactAddress(),
                        customUserRequest.getUserAffiliate(), customUserRequest.getUsername(), "",
                        roles
                );

                System.out.println(roles);
                userDao.save(users);

                resp.setResponseMessage("User saved successfully");
                resp.setResponseCode("000");

                //Get htmltemplate
                String htmlTemplate = getHtmlTemplateDefaultPassword(customUserRequest.getFirstName(), customUserRequest.getEmail());

                //Send Email
                com.esc.rtserver.util.Response respmail = sendMail(htmlTemplate, customUserRequest.getEmail());

                System.out.println(respmail);


            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage("User registration failed");
        }
        return resp;
    }

    /**+
     * Send Mail
     * @param template
     * @param email
     * @return
     */

    @Async
    public com.esc.rtserver.util.Response sendMail (String template, String email){

        com.esc.rtserver.util.Response mailresponse = new com.esc.rtserver.util.Response();

        try{
            mailresponse = mailAgent.generateAndSendEmail(template, email);
            if(mailresponse.getResponseCode().equals("000"))
                mailresponse.setResponseCode("000");
            mailresponse.setResponseMessage(mailresponse.getResponseMessage());

                return mailresponse;
        }
        catch (Exception e){
            e.printStackTrace();
            mailresponse.setResponseCode("999");
            mailresponse.setResponseMessage(mailresponse.getResponseMessage());

        }

        return mailresponse;
    }


//    public static void main(String[] args) {
//         UserService userService = new UserService();
//
//        System.out.println(userService.checkApprovalStatus("nana@gmail.com"));
//
//
//    }

    /**+
     * Generate  HTML Template
     * @param name
     * @param email
     * @return String
     */
    public String getHtmlTemplateDefaultPassword(String name, String email) {
        final Context ctx = new Context(Locale.getDefault());
        ctx.setVariable("customerName", name);
//        ctx.setVariable("url", url);
        final String templateFileName = email.toLowerCase().endsWith("@ecobank.com")? "ecoregmail" : "defaultpasswordmail";

        System.out.println(templateFileName);

        String htmlTemplate = this.templateEngine.process(templateFileName, ctx);

        return htmlTemplate;
    }

    /**
     *
     */
    public String getHtmlTemplateReject(String name, String email) {
        final Context ctx = new Context(Locale.getDefault());
        ctx.setVariable("customerName", name);
        final String templateFileName = "rejectuser";

        System.out.println(templateFileName);

        String htmlTemplate = this.templateEngine.process(templateFileName, ctx);

        return htmlTemplate;
    }

    /**
     * Generate HTML Template
     * @param name
     * @param url
     * @param fileName
     * @return String
     */
    public String getDefaultHtmlTemplate (String name, URI url, String fileName) {
        final Context ctx = new Context(Locale.getDefault());
        ctx.setVariable("customerName", name);
        ctx.setVariable("url", url);
        final String templateFileName = fileName; //Name of the template file without extension
        String htmlTemplate = this.templateEngine.process(templateFileName, ctx);
        return htmlTemplate;
    }

    /**+
     * Generate HTML Template
     * @param name
     * @param fileName
     * @param url
     * @return String
     */
    public String getDefaultHtmlTemplateForForgottenPassword (String name, String fileName, URI url) {
        final Context ctx = new Context(Locale.getDefault());
        ctx.setVariable("customerName", name);
        ctx.setVariable("url", url);

        String templateFileName = fileName; //Name of the template file without extension
        String htmlTemplate = this.templateEngine.process(templateFileName, ctx);
        return htmlTemplate;
    }


    /**
     * Reset Password
     * @param id
     * @param passwordRequest
     * @return a response class
     */
    public Response passwordUpdate(Long id, PasswordRequest passwordRequest) {

        Response resp = new Response();
        try {
            Optional<User> byId = userDao.findById(id);


         if (!passwordEncoder.matches(passwordRequest.getOldPassword(), byId.get().getPassword())){
             System.out.println("hello23");
                resp.setResponseCode("666");
                resp.setResponseMessage("Old Password is incorrect");
                return resp;
            }


             System.out.println(passwordEncoder.matches(passwordRequest.getOldPassword(), byId.get().getPassword()));
             byId.get().setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));

             userDao.save(byId.get());
             resp.setResponseMessage("User Password Updated Successfully");
             resp.setResponseCode("000");




        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("666");
            resp.setResponseMessage("User Password Update failed");
        }
        return resp;

    }

    /**+
     * Fetch approved users
     * @return a List
     */
    public List<User> fetchApproved() {
        return userDao.findByApprovalStatusAndRejectStatusAndDeleteFlagOrderByApprovedDateDesc("Y", "N", "N");
    }

    /**+
     * Fetch unapproved users
     * @return a List
     */
    public List<User> fetchUnapproved() {
        return userDao.findByApprovalStatusAndRejectStatusAndCreatedByIsNotIgnoreCaseOrderByCreationDateDesc("N", "N", getSessionVariables().getEmail());
    }

    /**+
     * Fetch rejected users
     * @return a List
     */
    public List<User> fetchRejected() {
        return userDao.findByRejectStatusAndApprovalStatusAndCreatedByIsNotIgnoreCaseOrderByRejectDateDesc("Y", "N", getSessionVariables().getEmail());
    }


//    public List<User> fetchDeleted() {
//        return userDao.findByDeleteFlag("Y");
//    }

    /**+
     * Reject a user
     * @param id
     * @param remark
     * @return a response class
     */
    public Response rejectPendingRequest(Long id, Remark remark) {

        Response resp = new Response();
        try {
            Optional<User> byId = userDao.findById(id);
            if (!byId.isPresent()) {
                resp.setResponseCode("999");
                resp.setResponseMessage("");
                return resp;
            }
            byId.get().setDeleteFlag("N");
            byId.get().setApprovalStatus("N");
            byId.get().setRejectStatus("Y");
            byId.get().setRejectDate(new Date());
            byId.get().setRejectedBy(getSessionVariables().getEmail());
            byId.get().setRemark(remark.getRemark());
            userDao.save(byId.get());
            resp.setResponseMessage("User Rejected Successfully");
            resp.setResponseCode("000");


            //Get htmltemplate
            String htmlTemplate = getHtmlTemplateReject(byId.get().getFirstName(), byId.get().getEmail());

            //Send Email
            com.esc.rtserver.util.Response respmail = sendMail(htmlTemplate, byId.get().getEmail());

            System.out.println(respmail);



        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage("User rejection failed");
        }
        return resp;
    }


    /**+
     * Approve a user
     * Generate token
     * Send mail with create password link
     * Attach token to url link
     * @param id
     * @return a response class
     */
    @Transactional
    public Response approveUserId(Long id) {
        Response resp = new Response();
        //Generate token
        String token = generateToken();
        try {
            Optional<User> byId = userDao.findById(id);
            if (!byId.isPresent()) {
                resp.setResponseCode("999");
                resp.setResponseMessage("User not found");
                return resp;
            }

            byId.get().setApprovalStatus("Y");
            byId.get().setApprovedDate(new Date());
            byId.get().setRejectStatus("N");
            byId.get().setDeleteFlag("N");
            byId.get().setApprovedBy(getSessionVariables().getEmail());
            userDao.save(byId.get());
            resp.setResponseMessage("User approved successfully");
            resp.setResponseCode("000");


            //Create an instance of the user object
            User user = userDao.findByUserId(byId.get().getUserId());

            System.out.println(user);

            //Save token

            createToken(user, token);



            //forgetten password url
            String fpasswordurl =  env.getRequiredProperty("forgottenpassword.localhost");
            String login = env.getRequiredProperty("login");





            //Build the URLs
            URI url = byId.get().getEmail().toLowerCase().endsWith("@ecobank.com")?  new URIBuilder(login).build():
                    new URIBuilder(fpasswordurl).addParameter("token", token).build();

            System.out.println("<<<<<<<>>>>>>>>>"+url);

            String fileName = byId.get().getEmail().toLowerCase().endsWith("@ecobank.com")? "ecoapprovalmail" : "approvalmail";
            String name = byId.get().getFirstName();
            String email = byId.get().getEmail();

            //Instatiate html template to variable
            String htmlTemplate = getDefaultHtmlTemplate(name, url, fileName);

            System.out.println(htmlTemplate);

//            //Send Mail
           com.esc.rtserver.util.Response respmail = sendMail(htmlTemplate, email);
           System.out.println(respmail);

        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage("User approval failed");
        }
        return resp;
    }

    /**+
     * This method generates the token
     * @return String
     */

    public String generateToken (){
      return UUID.randomUUID().toString();
    }


    /**+
     * This method saves the token to the database
     * @param user
     * @param token
     */

    public void createToken(User user, String token){


            Calendar cal = Calendar.getInstance(); // creates calendar
            cal.setTime(new Date()); // sets calendar time/date
            cal.add(Calendar.HOUR_OF_DAY, 4); // adds one hour
            Date expiryDate = cal.getTime();

        System.out.println("<<<<<<<<<<<< from create token"+user);

            Token newToken = new Token(token, user, expiryDate);

            tokenDAO.save(newToken);

    }


    /**+
     * Find a user by id
     * @param id
     * @return an optional user
     */
    public Optional<User> findUserById(Long id) {
        return userDao.findById(id);
    }

    /**+
     * Update a user
     * @param customUserRequest
     * @return a response class
     */
    public Response updateUser(CustomUserRequest customUserRequest) {


        Response resp = new Response();

        try {
            Optional<User> byId = userDao.findByEmailIgnoreCase(customUserRequest.getEmail());



            if (!byId.isPresent()) {
                resp.setResponseCode("999");
                resp.setResponseMessage("User not found");
                return resp;
            } else {

                Set<Role> roles = byId.get().getRoles();
                for(Role rol : roles){
                    rol.setRoleName(customUserRequest.getAccessiblePartners()+"."+ customUserRequest.getRole());
                    rol.setPermissions(gson.toJson(customUserRequest.getAccessRight()));
                }

                System.out.println(roles);

                byId.get().setApprovalStatus(customUserRequest.getApprovalStatus());
                byId.get().setApprovedDate(new Date());
                byId.get().setApprovedBy(getSessionVariables().getEmail());
                byId.get().setRejectStatus(customUserRequest.getRejectStatus());
                byId.get().setRoles(roles);
                userDao.save(byId.get());
                resp.setResponseMessage("User Update successful");
                resp.setResponseCode("000");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage("User update failed");
        }

        return resp;

    }

    public Response deleteUser(Long id) {
        Response resp = new Response();
        try {

            Optional<User> byId = userDao.findById(id);
            if (!byId.isPresent()) {
                resp.setResponseCode("999");
                resp.setResponseMessage("");
                return resp;
            } else {
                byId.get().setApprovalStatus("N");
                byId.get().setApprovedDate(new Date());
                byId.get().setApprovedBy(getSessionVariables().getEmail());
                byId.get().setDeleteFlag("Y");
                byId.get().setRejectStatus("N");
                byId.get().setDeletedBy(getSessionVariables().getEmail());
                byId.get().setDeletedDate(new Date());
                userDao.save(byId.get());
                resp.setResponseMessage("User Update successful");
                resp.setResponseCode("000");
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setResponseCode("999");
            resp.setResponseMessage("");
        }
        return resp;
    }


    /**
     * Send mail for forgot password
     * @param email
     * @return a response class
     */
    public Response sendForgotPasswordMail(String email) {

        Response resp = new Response();

        try {
            Optional<User> byEmail = userDao.findByEmailIgnoreCase(email);
            if (!byEmail.isPresent()) {
                resp.setResponseCode("999");
                resp.setResponseMessage("Email does not exist");
                return resp;
            }

            String fileName = "forgottenpasswordmail";
            String url = env.getRequiredProperty("forgottenpassword.localhost");

            String token = generateToken();
            createToken(userDao.findByUserId(byEmail.get().getUserId()), token);

          URI urlEn =  new URIBuilder(url).addParameter("token", token).build();
            System.out.println(env.getProperty("forgottenpassword.localhost"));
            System.out.println(urlEn);

         String htmlTemplate = getDefaultHtmlTemplateForForgottenPassword(byEmail.get().getFirstName(), fileName, urlEn);

          com.esc.rtserver.util.Response respmail = sendMail(htmlTemplate, email);
           System.out.println(respmail);

           if(respmail.getResponseCode().equals("000")) {
               resp.setResponseCode("000");
               resp.setResponseMessage(respmail.getResponseMessage());
               System.out.println(htmlTemplate);
               System.out.println(respmail);
               return resp;
           }

            resp.setResponseCode(respmail.getResponseCode());
            resp.setResponseMessage("An error occurred while sending the mail, please try again");

        } catch (Exception e) {
            e.printStackTrace();

        }
        System.out.println(resp.getResponseCode()+resp.getResponseMessage());
            return resp;

    }

    /**+
     * This method creates a new password for a user
     * @param token
     * @param password
     * @return reponse class
     */

    public Response resetPassword(String token, String password){
        Response resp = new Response();
        try{

            Optional<Token> byToken = tokenDAO.findByToken(token);

            if (!byToken.isPresent()){
                System.out.println("hello");
                resp.setResponseMessage("Token doesn't exist");
                resp.setResponseCode("999");
                return resp;
            }


            Calendar cal = Calendar.getInstance();
            if ((byToken.get().getExpiryDate()
                    .getTime() - cal.getTime()
                    .getTime()) <= 0) {
                System.out.println("hello");
                resp.setResponseMessage("Token has expired, kindly request a new reset link");
                resp.setResponseCode("999");
                return resp;
            }

            Optional<User> byId = findUserById(byToken.get().getUser().getUserId());
            if(byId.isPresent())
            byId.get().setPassword(passwordEncoder.encode(password));
            userDao.save(byId.get());

            resp.setResponseMessage("Password reset successfully");
            resp.setResponseCode("000");

        }catch (Exception e){
            e.printStackTrace();
            resp.setResponseMessage("Password reset failed");
            resp.setResponseCode("999");
        }

      return resp;
    }


    public Boolean checkApprovalStatus(String email) {
        Optional<User> byId = userDao.findByEmailIgnoreCase(email);
        System.out.println("<<<<<<<<<<<<<<<<<<<"+ byId);
        if (byId.isPresent() && byId.get().getApprovalStatus().equals("Y")) {
            return true;
        }
        return false;
    }

}
