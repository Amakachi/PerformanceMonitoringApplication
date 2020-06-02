package com.esc.rtserver.Dao;

import com.esc.rtserver.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleDao extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleNameIgnoreCase(String roleName);
    List<Role> findByRoleName(String roleName);
}
