package com.esc.rtserver.websocket.services;

import com.esc.rtserver.Dao.GenericProceduresDaoImpl;
import com.esc.rtserver.models.GenericProceduresModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiveUpdateService {

    final static Logger LOGGER = LoggerFactory.getLogger(LiveUpdateService.class);

    @Autowired
    private GenericProceduresDaoImpl genericProceduresDao;

    public List<GenericProceduresModel> publishUpdate(String destAff, String sourceAff,String startDate, String endDate){
        List<GenericProceduresModel> response = null;
        try {
            response = genericProceduresDao.getNosTransFrchannels(destAff,sourceAff,startDate,endDate);
            LOGGER.info("**********Live Update is running**********");
        }catch (Exception e){
            e.printStackTrace();
        }
        return response;
    }
}
