package com.esc.rtserver.websocket.services;


import com.esc.rtserver.Dao.GenericProceduresDaoImpl;
import com.esc.rtserver.models.GenericProceduresModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashStatsService {

    final static Logger LOGGER = LoggerFactory.getLogger(DashStatsService.class);

    @Autowired
    private GenericProceduresDaoImpl genericProceduresDao;

    public List<GenericProceduresModel> publishUpdate(String startDate,String endDate,String sendOrReceive,String partner){
        List<GenericProceduresModel> response = null;
        try {
            response = genericProceduresDao.getTotalPercDashStats(startDate,endDate,sendOrReceive,partner);
            LOGGER.info("**********DashStats Service is running**********");
        }catch (Exception e){
            e.printStackTrace();
        }
        return response;
    }
}
