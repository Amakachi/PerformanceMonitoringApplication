package com.esc.rtserver.Dao;

import com.esc.rtserver.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User,Long> {
    Optional<User> findByUserNameIgnoreCase(String username);
    Optional<User> findByEmailIgnoreCase(String email);
    List<User> findUsersByEmail(String email);
    List<User>  findByApprovalStatusAndRejectStatusAndDeleteFlagOrderByApprovedDateDesc(String y, String n, String e);
    List<User>  findByApprovalStatusAndRejectStatusAndCreatedByIsNotIgnoreCaseOrderByCreationDateDesc(String y,String n, String e);
    List<User> findAllByRejectStatusOrderByCreationDateDesc(String e);
//    List <User> findByDeleteFlag(String y);
    List<User> findByRejectStatusAndApprovalStatusAndCreatedByIsNotIgnoreCaseOrderByRejectDateDesc(String e, String u, String s);
    Optional<User> findByEmailAndRejectStatus(String e, String y);
//    Optional<User> findByPasswordResetFlagAndEmailIgnoreCaseIs(String e, String y);
    User findByUserId(Long userId);


//    List<User> findByUserNameIsNotIgnoreCaseAndApprovalStatusOrderByUserNameAsc(String userName, String status);
//    List<User> findAllByOrderByUserNameAsc();
//    List<User> findByAffiliateIgnoreCase(String affiliateCode);
}
