package com.esc.rtserver.entities;

import javax.persistence.*;

@Entity
@Table(name = "rt_roles")
public class Role {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="RoleTb_seqgen")
    @SequenceGenerator(name="RoleTb_seqgen", sequenceName="RT_ROLES_SEQ", allocationSize = 1)
    @Column(name = "id")
    private long roleId;
    @Column(name = "roleName")
    private String roleName;

    @Column(name = "permissions")
    private String permissions;

//    @OneToMany(cascade=CascadeType.ALL)
//    @JoinTable(name="rt_roleUsers", joinColumns={@JoinColumn(name="roleId", referencedColumnName="id")}
//            , inverseJoinColumns={@JoinColumn(name="userId", referencedColumnName="id")})
//    private Set<User> users;

    public Role() {

    }

    public Role(String roleName, String permissions) {
        this.roleName = roleName;
        this.permissions = permissions;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

//    public Set<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getPermissions() {
        return permissions;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + roleId +
                ", roleName='" + roleName + '\'' +
                ", permissions='" + permissions + '\'' +
                '}';
    }
}
