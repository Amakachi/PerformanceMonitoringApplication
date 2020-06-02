package com.esc.rtserver.models;


import com.esc.rtserver.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    public User user;

    public CustomUserDetails() { }

    public CustomUserDetails(final User _user) {
        this.user = _user;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
//        final Set<GrantedAuthority> _grntdAuths = new HashSet<GrantedAuthority>();
//
//        List<UserRoles> _roles = null;
//
//        if (user != null) {
//            _roles = user.getUserRoles().stream().collect(Collectors.toList());
//        }
//
//        if (_roles != null) {
//            for (UserRoles _role : _roles) {
//                _grntdAuths.add(new SimpleGrantedAuthority(_role.getRole().getRoleName()));
//            }
//        }
//
//        return _grntdAuths;
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        if (this.user == null) {
            return null;
        }
        return this.user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User getUser() {
        return user;
    }


    @Override
    public String toString() {
        return "CustomUserDetails [user=" + user + "]";

    }

    public void setUser(User user) {
        this.user = user;
    }


}
