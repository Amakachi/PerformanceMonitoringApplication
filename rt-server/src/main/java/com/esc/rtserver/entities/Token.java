package com.esc.rtserver.entities;

import com.esc.rtserver.models.TokenAuditModel;
import com.sun.istack.Nullable;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rt_tokens")
public class Token extends TokenAuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TOkenTb_seqgen")
    @SequenceGenerator(name="TOkenTb_seqgen", sequenceName="RT_TOKENS_SEQ",allocationSize=1)
    private Long id;

    @Column(name = "token")
    private String token;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "userId", referencedColumnName = "id")
//    private User user;


    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "userId")
    private User user;

    @Column(name = "expiryDate")
    private Date expiryDate;

    public Token() {
    }

    public Token(String token, User user, Date expiryDate) {
        this.token = token;
        this.user = user;
        this.expiryDate = expiryDate;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "Token{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", user=" + user +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
