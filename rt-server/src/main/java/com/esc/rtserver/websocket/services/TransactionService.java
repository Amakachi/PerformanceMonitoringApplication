package com.esc.rtserver.websocket.services;

import com.esc.rtserver.Dao.GenericProceduresDaoImpl;
import com.esc.rtserver.models.GenericProceduresModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TransactionService {

    final static Logger LOGGER = LoggerFactory.getLogger(TransactionService.class);

    @Autowired
    private GenericProceduresDaoImpl genericProceduresDao;

    public List<GenericProceduresModel> publishUpdate(String startDate, String endDate,String transPartner,String sendOrReceive){
        List<GenericProceduresModel> response = null;
        try {
            response = genericProceduresDao.getFailPendTransFrpartners(startDate,endDate,transPartner,sendOrReceive);
            LOGGER.info("**********Failed/Pending transaction Service is running**********");
        }catch (Exception e){
            e.printStackTrace();
        }
        return response;
    }
}
