package com.esc.rtserver.controllers;

import com.esc.rtserver.Dao.SearchTransactionsDaoImpl;
import com.esc.rtserver.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchTransactionsProcedureController {

    @Autowired
    private SearchTransactionsDaoImpl searchTransactionsDao;

    @PostMapping(value = "/getSearchTransactions")
    public ResponseEntity<List<SearchTransactionsProcedureModel>> getSearchTransactions(@RequestBody SearchTransactionsProcedureRequestModel request) {
        List<SearchTransactionsProcedureModel> details = searchTransactionsDao
                .getSearchTransactions(request.getPartner(),request.getStartDate(), request.getEndDate(),
                        request.getRecordLimit(), request.getReferenceNo(), request.getSenderId(),
                        request.getTransactionChannel(), request.getStatus(), request.getSendOrReceive() );
        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getSearchTransactionDetail")
    public ResponseEntity<List<SearchByIdResponse>> getSearchTransactionDetail(@RequestBody SearchTransactionsProcedureRequestModel request) {
        List<SearchByIdResponse> details = searchTransactionsDao
                .getSearchTransactionDetail(request.getTransId(), request.getPartner(), request.getSendOrReceive());
        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getSenderKycDetails")
    public ResponseEntity<List<SenderKycDetails>> getSenderKycDetails(@RequestBody SearchTransactionsProcedureRequestModel request) {
        List<SenderKycDetails> details = searchTransactionsDao.getSenderKycDetails(request.getSenderId());
        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getReceiverKycDetails")
    public ResponseEntity<List<ReceiverKycDetails>> getReceiverKycDetails(@RequestBody SearchTransactionsProcedureRequestModel request) {
        List<ReceiverKycDetails> details = searchTransactionsDao.getReceiverKycDetails(request.getReceiverId());
        return ResponseEntity.ok(details);

    }

    @PostMapping(value = "/getReportDetails")
    public ResponseEntity<List<SearchTransactionsProcedureModel>> getReportDetails(@RequestBody SearchTransactionsProcedureRequestModel request) {
        List<SearchTransactionsProcedureModel> details = searchTransactionsDao
                .getReportDetails(request.getPartner(),request.getStartDate(), request.getEndDate(),
                        request.getRecordLimit(), request.getReferenceNo(), request.getSenderId(),
                        request.getTransactionChannel(), request.getStatus(), request.getSendOrReceive() );
        return ResponseEntity.ok(details);

    }


}
