package com.esc.rtserver.controllers;

import com.esc.rtserver.entities.Role;
import com.esc.rtserver.models.Response;
import com.esc.rtserver.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/roles")
public class RoleController {

    @Autowired
    RoleService roleService;

    @PostMapping("/create")
    public Response createRole(@RequestBody  Role role){
        System.out.println(role);
        return roleService.create(role);
    }


    @GetMapping()
    public List <Role> getRoles(String roleName){
        return roleService.findRole(roleName);
    }



}
