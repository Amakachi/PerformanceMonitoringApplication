package com.esc.rtserver.controllers;

import com.esc.rtserver.Dao.GenericProceduresDaoImpl;
import com.esc.rtserver.models.GenericProceduresModel;
import com.esc.rtserver.models.GenericProceduresRequestModel;
import com.esc.rtserver.models.ReportDetailsModel;
import com.esc.rtserver.models.TransactionRespCountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generic")
public class GenericProcedureController {
    @Autowired
    private GenericProceduresDaoImpl genericProceduresDao;

    @PostMapping(value = "/getFailedPendingTransPartners")
    public ResponseEntity<List<GenericProceduresModel>> getFailPendTransFrpartners(@RequestBody GenericProceduresRequestModel request) {
        List<GenericProceduresModel> details = genericProceduresDao
                .getFailPendTransFrpartners(request.getStartDate(), request.getEndDate(), request.getPartner(), request.getSendOrReceive());
        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getTotalPercDashStats")
    public ResponseEntity<List<GenericProceduresModel>> getTotalPercDashStats(@RequestBody GenericProceduresRequestModel request) {
        List<GenericProceduresModel> details = genericProceduresDao
                .getTotalPercDashStats(request.getStartDate(), request.getEndDate(), request.getSendOrReceive(), request.getPartner());
        return ResponseEntity.ok(details);

    }


    @PostMapping(value = "/getNosTransFrchannels")
    public ResponseEntity<List<GenericProceduresModel>> getNosTransFrchannels(@RequestBody GenericProceduresRequestModel request) {
        List<GenericProceduresModel> details = genericProceduresDao
                .getNosTransFrchannels(request.getDestinationAffiliate(),
                        request.getSourceAffiliate(),
                        request.getStartDate(),
                        request.getEndDate());
        return ResponseEntity.ok(details);

    }


    @PostMapping(value = "/getGraphStatsDashboard")
    public ResponseEntity<List<GenericProceduresModel>> getGraphStatsDashboard(@RequestBody GenericProceduresRequestModel request) {


        List<GenericProceduresModel> details = genericProceduresDao
                .getGraphStatsDashboard(request.getStartDate(),
                        request.getEndDate(),
                        request.getPartner(),
                        request.getSendOrReceive(),
                        request.getDdOrMmOrYy());

        return ResponseEntity.ok(details);

    }


    @PostMapping(value = "/getGraphFrStatsTab")
    public ResponseEntity<List<GenericProceduresModel>> getGraphFrStatsTab(@RequestBody GenericProceduresRequestModel request) {
        List<GenericProceduresModel> details = genericProceduresDao
                .getGraphFrStatsTab(request.getDestinationAffiliate(), request.getSourceAffiliate(), request.getTransactionChannel(), request.getStartDate(), request.getEndDate());
        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getTranResponseMsgCount")
    public ResponseEntity<List<TransactionRespCountModel>> getTranResponseMsgCount(@RequestBody GenericProceduresRequestModel request) {
        List<TransactionRespCountModel> details = genericProceduresDao
                .getTranResponseMsgCount(request.getDestinationAffiliate(), request.getSourceAffiliate(), request.getTransactionChannel(), request.getSendOrReceive(), request.getStartDate(), request.getEndDate());
        return ResponseEntity.ok(details);
    }

    @PostMapping(value = "/getTransStatesTotalReport")
    public ResponseEntity<List<GenericProceduresModel>> getTransStatesTotalReport(@RequestBody GenericProceduresRequestModel request) {
        System.out.println(request);
        List<GenericProceduresModel> details = genericProceduresDao
                .getTransStatesTotalReport(request.getDestinationAffiliate(),
                        request.getSourceAffiliate(), request.getSendOrReceive(), request.getTransactionChannel(), request.getStartDate(), request.getEndDate());

        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getReportDetailsfrReport")
    public ResponseEntity<List<ReportDetailsModel>> getReportDetailsfrReport(@RequestBody GenericProceduresRequestModel request) {
        List<ReportDetailsModel> details = genericProceduresDao
                .getReportDetailsfrReport(request.getDestinationAffiliate(), request.getSourceAffiliate(), request.getSendOrReceive(),
                        request.getTransactionChannel(), request.getStartDate(), request.getEndDate());
        return ResponseEntity.ok(details);
    }


    @PostMapping(value = "/getTotalChannelTransStats")
    public ResponseEntity<List<GenericProceduresModel>> getTotalChannelTransStats(@RequestBody GenericProceduresRequestModel request) {
        List<GenericProceduresModel> details = genericProceduresDao
                .getTotalChannelTransStats(request.getDestinationAffiliate(), request.getSourceAffiliate(), request.getTransactionChannel(), request.getStartDate(),
                        request.getEndDate());
        return ResponseEntity.ok(details);
    }


    @PostMapping(value = "/getTransVolValReport")
    public ResponseEntity<List<GenericProceduresModel>> getTransVolValReport(@RequestBody GenericProceduresRequestModel requestModel) {
        System.out.println(requestModel);
        List<GenericProceduresModel> details = genericProceduresDao
                .getTransVolValReport(requestModel.getStartDate(), requestModel.getEndDate(), requestModel.getSendOrReceive(), requestModel.getTransactionChannel(), requestModel.getPartner(), requestModel.getAffiliate());

        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getErrorResponseReport")
    public ResponseEntity<List<TransactionRespCountModel>> getErrorResponseReport(@RequestBody GenericProceduresRequestModel requestModel) {
        List<TransactionRespCountModel> details = genericProceduresDao
                .getErrorResponseReport(requestModel.getPartner(), requestModel.getAffiliate(), requestModel.getTransactionChannel(), requestModel.getSendOrReceive(), requestModel.getStartDate(), requestModel.getEndDate());
        return ResponseEntity.ok(details);


    }
    @PostMapping(value = "/getTransChannelsReport")
    public ResponseEntity<List<TransactionRespCountModel>>  getTransChannelsReport(@RequestBody GenericProceduresRequestModel requestModel) {
        List<TransactionRespCountModel> details = genericProceduresDao
                .getTransChannelsReport(requestModel.getPartner());
        return ResponseEntity.ok(details);


    }
}
