package com.esc.rtserver.controllers;

import com.esc.rtserver.entities.User;
import com.esc.rtserver.models.CustomUserRequest;
import com.esc.rtserver.models.PasswordRequest;
import com.esc.rtserver.models.Remark;
import com.esc.rtserver.models.Response;
import com.esc.rtserver.services.UserService;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    private static final Logger logger = Logger.getLogger(UserController.class.getName());

    @GetMapping("/fillsessionvariables")
    public Optional<User> fillSessionVariables(){
        logger.info("Filling Session Variables");
        return userService.setSessionValues();
    }

    @GetMapping()
    public Response findUser(String email){
        Response resp = new Response();
        resp.setResponseCode("000");
        resp.setResponseMessage("User fetched successfully");
        resp.setData(userService.findUserByEmail(email));

        return resp;
    }
    @PostMapping("/create")
    public Response createUser(@RequestBody com.esc.rtserver.entities.User user){
        return userService.createUser(user);
    }

    @GetMapping("/fetchaduser/{email}/")
    public Response fetchUserFromAD(@PathVariable("email") String email){ return userService.fetchADUser(email);
    }

    @GetMapping("/fetchdbuser/{email}/")
    public List<User> fetchDbUser(@PathVariable("email") String email){
        return userService.fetchUserFromDB(email);
    }

    @PostMapping("/createCustomUser")
        public Response createCustom(@RequestBody CustomUserRequest customUserRequest){
        return userService.createCustomUser(customUserRequest);
    }

    @GetMapping("/findAll")
    public List<User> findAllUser(){
        return userService.findAllUsers();
    }

    @GetMapping("/fetchApproved")
    public List<User> fetchApproved(){
        return userService.fetchApproved();
    }

    @GetMapping("/fetchUnApproved")
    public List<User> fetchUnApproved(){
        return userService.fetchUnapproved();
    }

    @GetMapping("/approve/{id}")
    public Response approve(@PathVariable("id") Long id){
        return userService.approveUserId(id);
    }

    @GetMapping("/findById/{id}")
        public Optional<User>findById(@PathVariable("id") Long id){
            return userService.findUserById(id);
        }

        @PostMapping("/rejectPending/{id}")
    public Response rejectPending(@PathVariable("id") Long id, @RequestBody Remark remark){
        return userService.rejectPendingRequest(id,remark);
        }

        @GetMapping("/fetchRejected")
    public List<User> fetchRejected (){
        return userService.fetchRejected();
        }

//    @GetMapping("/fetchDeleted")
//    public List<User> fetchDeleted (){
//        return userService.fetchDeleted();
//    }

    @PostMapping("/updateUser")
    public Response updateUser (@RequestBody CustomUserRequest customUserRequest){
        return userService.updateUser(customUserRequest);
    }

    @GetMapping("/deleteUser/{id}")
    public Response deleteUser(@PathVariable("id") Long id){
        return userService.deleteUser(id);
    }


    @PostMapping("/updatePassword/{id}")
    public Response updatePassword(@PathVariable("id") Long id, @RequestBody PasswordRequest passwordRequest){
        return userService.passwordUpdate(id, passwordRequest);
    }

    @PostMapping("/sendEmailOnForgottenPassword")
    public Response sendEmailOnForgottenPassword(@RequestBody CustomUserRequest customUserRequest){

        return userService.sendForgotPasswordMail(customUserRequest.getEmail());
    }

    @PostMapping("/resetPassword")
    public Response resetPassword(@RequestParam("token") String token, @RequestBody PasswordRequest passwordRequest){

        return userService.resetPassword(token, passwordRequest.getNewPassword());
    }


    @PostMapping("/email")
    public Boolean email(@RequestBody CustomUserRequest customUserRequest){
      return userService.checkApprovalStatus(customUserRequest.getEmail());
    }

}
