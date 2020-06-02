package com.esc.rtserver.entities;

import com.esc.rtserver.models.AuditModel;
import com.sun.istack.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "rt_users")
public class User extends AuditModel {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="UserTb_seqgen")
    @SequenceGenerator(name="UserTb_seqgen", sequenceName="RT_USER_SEQ",allocationSize=1)
    @Column(name = "id")
    private Long userId;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "affiliate")
    private String affiliate;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "username", unique = true)
    private String userName;
    @Column(name = "department")
    private String department;
    @Column(name="phoneNumber")
    private String phoneNumber;
    @Column(name="contactAddress")
    private String contactAddress;




//    @ManyToOne()
//    private Role role;


    @ManyToMany(cascade={CascadeType.ALL, CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name="rt_users_role", joinColumns={@JoinColumn(name="userId", referencedColumnName="id")}
            , inverseJoinColumns={@JoinColumn(name="roleId", referencedColumnName="id")})
    private Set<Role> roles;


//    @OneToOne(mappedBy = "user")
//    private Token token;
//

//    public Token getToken() {
//        return token;
//    }
//
//    public void setToken(Token token) {
//        this.token = token;
//    }

    public Set<Role> getRoles() {
        return roles;
    }

    public String getAffiliate() {
        return affiliate;
    }

    public void setAffiliate(String affiliate) {
        this.affiliate = affiliate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public User() {
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public User(String remark, String approvalStatus, String rejectStatus, String deleteFlag, String firstName, String lastName,  String email, String password,
                String phoneNumber, String contactAddress, String userName, String affiliate, String department, Set<Role> roles) {
        super(remark, approvalStatus, rejectStatus, deleteFlag);
        this.firstName = firstName;
        this.lastName = lastName;

        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.contactAddress = contactAddress;
        this.userName = userName;
        this.affiliate = affiliate;
        this.department = department;
        this.roles = roles;

    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }



    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", affiliate='" + affiliate + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", userName='" + userName + '\'' +
                ", department='" + department + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", contactAddress='" + contactAddress + '\'' +
                ", roles=" + roles +
                '}';
    }
}
