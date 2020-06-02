package com.esc.rtserver.services;

import com.esc.rtserver.Dao.UserDao;
import com.esc.rtserver.entities.User;
import com.esc.rtserver.models.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
public class UserDetailService implements UserDetailsService
{
    @Autowired
    private UserDao userDao;

    @Override
    public CustomUserDetails loadUserByUsername(String email) {
        User user = userDao.findByEmailIgnoreCase(email).get();
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        return new CustomUserDetails(user);
    }
}