package com.esc.rtserver.services;

import com.esc.rtserver.Dao.RoleDao;
import com.esc.rtserver.entities.Role;
import com.esc.rtserver.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;


    public List <Role> findRole(String roleName){
        Response resp = new Response();

        List<Role> role  = roleDao.findByRoleName(roleName);
        return role;
    }


    @Transactional
    public Response create(Role role) {
        System.out.println(role);
        Response resp = new Response();

        if (roleDao.findByRoleNameIgnoreCase(role.getRoleName()).isPresent()) {
            resp.setResponseCode("999");
            resp.setResponseMessage("Role already exists");
            return resp;
        }
        System.out.println(role);
        roleDao.save(role);
        resp.setResponseCode("000");
        resp.setResponseMessage("Role Saved Successfully");
        return resp;
    }



}
