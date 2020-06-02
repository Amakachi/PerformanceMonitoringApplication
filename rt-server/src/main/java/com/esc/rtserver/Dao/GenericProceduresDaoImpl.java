package com.esc.rtserver.Dao;

import com.esc.rtserver.models.GenericProceduresModel;
import com.esc.rtserver.models.ReportDetailsModel;
import com.esc.rtserver.models.TransactionRespCountModel;
import com.esc.rtserver.utilities.DbConnection;
import oracle.jdbc.internal.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


@Repository
public class GenericProceduresDaoImpl {

    @Autowired
    private DbConnection dbconn;

    @Autowired
    @Qualifier("hikariCP")
    private DataSource dataSource;

    public List<GenericProceduresModel> getFailPendTransFrpartners(String startDate, String endDate,String partner, String sendOrReceive) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_fail_pend_trans_frpartners(?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, startDate);
            callableStatement.setString(2, endDate);
            callableStatement.setString(3, partner);
            callableStatement.setString(4, sendOrReceive);
            callableStatement.registerOutParameter(5, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(5);
            while (resultSet.next()) {
                detail = new GenericProceduresModel();
                detail.setPartner(resultSet.getString("partner"));
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                detail.setSuccessAmount(resultSet.getString("success_amount"));
                detail.setFailedAmount(resultSet.getString("failed_amount"));
                detail.setPendingAmount(resultSet.getString("pending_amount"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }

    public List<GenericProceduresModel> getTotalPercDashStats(String startDate, String endDate,String sendOrReceive, String partner) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_total_perc_dash_stats(?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, startDate);
            callableStatement.setString(2, endDate);
            callableStatement.setString(3, sendOrReceive);
            callableStatement.setString(4, partner);
            callableStatement.registerOutParameter(5, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(5);
            while (resultSet.next()) {
                detail = new GenericProceduresModel();
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setPercentageSuccess(resultSet.getBigDecimal("perc_success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPercentageFailed(resultSet.getBigDecimal("perc_failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                detail.setPercentagePending(resultSet.getBigDecimal("perc_pending_count"));
                detail.setTransactionCount(resultSet.getBigDecimal("total_count"));
                detail.setSuccessAmount(resultSet.getString("success_amount"));
                detail.setPercSuccessAmount(resultSet.getBigDecimal("perc_success_amount"));
                detail.setFailedAmount(resultSet.getString("failed_amount"));
                detail.setPercFailedAmount(resultSet.getBigDecimal("perc_failed_amount"));
                detail.setPendingAmount(resultSet.getString("pending_amount"));
                detail.setPercPendingAmount(resultSet.getBigDecimal("perc_pending_amount"));
                detail.setTransactionAmount(resultSet.getString("total_amount"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }


    public List<GenericProceduresModel> getNosTransFrchannels(String destAff,String sourceAff,String startDate, String endDate) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.GET_TRANS_VOL_VAL_frCHANNELS(?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, destAff);
            callableStatement.setString(2, sourceAff);
            callableStatement.setString(3, startDate);
            callableStatement.setString(4, endDate);
            callableStatement.registerOutParameter(5, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(5);
            while (resultSet.next()) {
                detail = new GenericProceduresModel();
                detail.setChannels(resultSet.getString("channels"));
                detail.setChannelCode(resultSet.getString("channel_code"));
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                detail.setSuccessAmount(resultSet.getString("success_amount"));
                detail.setFailedAmount(resultSet.getString("failed_amount"));
                detail.setPendingAmount(resultSet.getString("pending_amount"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }


    public List<GenericProceduresModel> getGraphStatsDashboard(String startDate, String endDate, String partner,String sendOrReceive, String ddOrMmOrYy) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_graph_stats_dashboard(?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, startDate);
            callableStatement.setString(2, endDate);
            callableStatement.setString(3, partner);
            callableStatement.setString(4, sendOrReceive);
            callableStatement.setString(5, ddOrMmOrYy);
            callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(6);
            while (resultSet.next()) {
                detail = new GenericProceduresModel();
                detail.setTransactionDate(resultSet.getString("transaction_date"));
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                detail.setSuccessAmount_(resultSet.getBigDecimal("success_amount"));
                detail.setFailedAmount_(resultSet.getBigDecimal("failed_amount"));
                detail.setPendingAmount_(resultSet.getBigDecimal("pending_amount"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }


    public List<GenericProceduresModel> getGraphFrStatsTab(String destinationAffiliate, String sourceAffiliate, String transactionChannel, String startDate, String endDate) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.GET_TRANS_VOLUME_VALUE_CUSTOM(?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, destinationAffiliate);
            callableStatement.setString(2, sourceAffiliate);
            callableStatement.setString(3, transactionChannel);
            callableStatement.setString(4, startDate);
            callableStatement.setString(5, endDate);
            callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(6);
            while (resultSet.next()) {
                detail = new GenericProceduresModel();
                detail.setDaily(resultSet.getString("daily"));
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                detail.setSuccessAmount_(resultSet.getBigDecimal("success_amount"));
                detail.setFailedAmount_(resultSet.getBigDecimal("failed_amount"));
                detail.setPendingAmount_(resultSet.getBigDecimal("pending_amount"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }


    public List<TransactionRespCountModel> getTranResponseMsgCount(String destinationAffiliate, String sourceAffiliate, String transactionChannel,String sendOrReceive, String startDate, String endDate) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<TransactionRespCountModel> response = new ArrayList<>();
        TransactionRespCountModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_trans_response_msg_count(?,?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, destinationAffiliate);
            callableStatement.setString(2, sourceAffiliate);
            callableStatement.setString(3, transactionChannel);
            callableStatement.setString(4, sendOrReceive);
            callableStatement.setString(5, startDate);
            callableStatement.setString(6, endDate);
            callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(7);
            while (resultSet.next()) {
                detail = new TransactionRespCountModel();
                detail.setResponseCode(resultSet.getString("response_code"));
                detail.setResponseMessage(resultSet.getString("response_msg"));
                detail.setResponsePercentage(resultSet.getBigDecimal("response_percentage"));
                detail.setErrorCount(resultSet.getBigDecimal("response_count"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }


    public List<TransactionRespCountModel> getTranResponseMsgCountPartners(String destinationAffiliate, String sourceAffiliate, String transactionChannel, String startDate, String endDate) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<TransactionRespCountModel> response = new ArrayList<>();
        TransactionRespCountModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_trans_response_msg_count(?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, destinationAffiliate);
            callableStatement.setString(2, sourceAffiliate);
            callableStatement.setString(3, transactionChannel);
            callableStatement.setString(4, startDate);
            callableStatement.setString(5, endDate);
            callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(6);
            while (resultSet.next()) {
                detail = new TransactionRespCountModel();
                detail.setResponseCode(resultSet.getString("response_code"));
                detail.setResponseMessage(resultSet.getString("response_msg"));
                detail.setResponsePercentage(resultSet.getBigDecimal("response_percentage"));
                detail.setErrorCount(resultSet.getBigDecimal("response_count"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }


    //  @GKINAKO : Made changes starting here

    public List<GenericProceduresModel> getTotalChannelTransStats(String destinationAffiliate, String sourceAffiliate, String transactionChannel,  String startDate, String endDate) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_total_channel_trans_states(?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, destinationAffiliate);
            callableStatement.setString(2, sourceAffiliate);
            callableStatement.setString(3, transactionChannel);
            callableStatement.setString(4, startDate);
            callableStatement.setString(5, endDate);
            callableStatement.registerOutParameter(6, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(6);
            while (resultSet.next()) {
                detail = new GenericProceduresModel();
                detail.setChannels(resultSet.getString("channel"));
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                response.add(detail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }

public List<GenericProceduresModel> getTransStatesTotalReport(String destAffiliate, String sourceAffiliate, String sendOrReceive, String transactionChannel, String startDate, String endDate) {
    Connection connection = null;
    CallableStatement callableStatement = null;
    ResultSet resultSet = null;
    List<GenericProceduresModel> response = new ArrayList<>();
    GenericProceduresModel detail = null;
    try {
        connection = dataSource.getConnection();
        String query = "{call eco_rt_partners_settlement_pkg.get_trans_states_total_rprt(?,?,?,?,?,?,?)}";
        callableStatement = connection.prepareCall(query);
        callableStatement.setString(1, destAffiliate);
        callableStatement.setString(2, sourceAffiliate);
        callableStatement.setString(3, sendOrReceive);
        callableStatement.setString(4, transactionChannel);
        callableStatement.setString(5, startDate);
        callableStatement.setString(6, endDate);
        callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
        callableStatement.execute();
        resultSet = (ResultSet) callableStatement.getObject(7);
        System.out.println(resultSet);
        while (resultSet.next()) {
            detail = new GenericProceduresModel();
            detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
            detail.setPercentageSuccess(resultSet.getBigDecimal("perc_success_count"));
            detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
            detail.setPercentageFailed(resultSet.getBigDecimal("perc_failed_count"));
            detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
            detail.setPercentagePending(resultSet.getBigDecimal("perc_pending_count"));
            detail.setTotalPercentageCount(resultSet.getBigDecimal("total_perc_count"));
            detail.setTransactionCount(resultSet.getBigDecimal("total_count"));
            detail.setSuccessAmount(resultSet.getString("success_amount"));
            detail.setFailedAmount(resultSet.getString("failed_amount"));
            detail.setPendingAmount(resultSet.getString("pending_amount"));
            detail.setPercSuccessAmount(resultSet.getBigDecimal("perc_success_amount"));
            detail.setPercFailedAmount(resultSet.getBigDecimal("perc_failed_amount"));
            detail.setPercPendingAmount(resultSet.getBigDecimal("perc_pending_amount"));
            detail.setTotalPercentageAmount(resultSet.getBigDecimal("total_perc_amount"));
            detail.setTransactionAmount(resultSet.getString("send_amount"));
            response.add(detail);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        dbconn.closeConnection(connection, callableStatement, resultSet);
    }
    return response;
}


    public List<ReportDetailsModel> getReportDetailsfrReport(String destAffiliate, String sourceAffiliate,String sendOrReceive,  String transactionChannel, String startDate, String endDate) {
        System.out.println("we are here");
        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<ReportDetailsModel> response = new ArrayList<>();
        ReportDetailsModel detail = null;

        try {
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_report_details_frreport(?,?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, destAffiliate);
            callableStatement.setString(2, sourceAffiliate);
            callableStatement.setString(3, sendOrReceive);
            callableStatement.setString(4, transactionChannel);
            callableStatement.setString(5, startDate);
            callableStatement.setString(6, endDate);
            callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(7);

            while (resultSet.next()) {
                detail = new ReportDetailsModel();
                detail.setTransactionPartner(resultSet.getString("partner"));
                detail.setTransactionCount(resultSet.getBigDecimal("total_volume"));
                detail.setSuccessCount(resultSet.getBigDecimal("success_count"));
                detail.setFailedCount(resultSet.getBigDecimal("failed_count"));
                detail.setPendingCount(resultSet.getBigDecimal("pending_count"));
                detail.setTotalValue(resultSet.getString("total_amount"));
                detail.setSuccessAmount(resultSet.getString("success_amount"));
                detail.setFailedAmount(resultSet.getString("failed_amount"));
                detail.setPendingAmount(resultSet.getString("pending_amount"));
                response.add(detail);


            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;
    }

    public List<GenericProceduresModel> getTransVolValReport(String startDate, String endDate, String sendReceive, String transChannel, String partner, String affiliate){

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<GenericProceduresModel> response = new ArrayList<>();
        GenericProceduresModel detail = null;
        try{
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_total_vol_val_report(?,?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, startDate);
            callableStatement.setString(2, endDate);
            callableStatement.setString(3, sendReceive);
            callableStatement.setString(4, transChannel);
            callableStatement.setString(5, partner);
            callableStatement.setString(6, affiliate);
            callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
            callableStatement.execute();
            resultSet = (ResultSet) callableStatement.getObject(7);
            System.out.println(resultSet);

            while (resultSet.next()){
                detail= new GenericProceduresModel();
                detail.setSourceAffiliate(resultSet.getString("source_affiliate"));
                detail.setDestinationAffiliate(resultSet.getString("destination_affiliate"));
                detail.setTransactionAmount(resultSet.getString("total_amount"));
                detail.setSuccessAmount(resultSet.getString("success_amount"));
                detail.setPendingAmount(resultSet.getString("pending_amount"));
                detail.setFailedAmount(resultSet.getString("failed_amount"));
                detail.setTransactionCount_(resultSet.getString("total_count"));
                detail.setSuccessCount_(resultSet.getString("success_count"));
                detail.setPendingCount_(resultSet.getString("pending_count"));
                detail.setFailedCount_(resultSet.getString("failed_count"));

                response.add(detail);

            }
        }
        catch (Exception e){
            e.printStackTrace();
        }finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }
        return response;
    }

    public List<TransactionRespCountModel> getErrorResponseReport(String partner,  String affiliate, String transChannel,  String sendReceive, String startDate, String endDate){

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<TransactionRespCountModel> response = new ArrayList<>();
        TransactionRespCountModel detail = null;
        try{
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_error_response_report(?,?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, partner);
            callableStatement.setString(2, affiliate);
            callableStatement.setString(3, transChannel);
            callableStatement.setString(4, sendReceive);
            callableStatement.setString(5, startDate);
            callableStatement.setString(6, endDate);
            callableStatement.registerOutParameter(7, OracleTypes.CURSOR);
            callableStatement.execute();
            resultSet = (ResultSet) callableStatement.getObject(7);
            System.out.println(resultSet);

            while (resultSet.next()){
                detail= new TransactionRespCountModel();
                detail.setResponseCode(resultSet.getString("response_code"));
                detail.setResponseMessage(resultSet.getString("response_msg"));
                detail.setResponsePercentage(resultSet.getBigDecimal("response_percentage"));
                detail.setResponseCount(resultSet.getBigDecimal("response_count"));
                detail.setResponseValue(resultSet.getString("response_value"));

                response.add(detail);

            }
        }
        catch (Exception e){
            e.printStackTrace();
        }finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }
        return response;
    }

    public List<TransactionRespCountModel> getTransChannelsReport(String partner){

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<TransactionRespCountModel> response = new ArrayList<>();
        TransactionRespCountModel detail = null;
        try{
            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.GET_DISTINCT_CHANNELS(?,?,?)}";
            callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, partner);
            callableStatement.registerOutParameter(2, OracleTypes.VARCHAR);
            callableStatement.registerOutParameter(3, OracleTypes.CURSOR);
           // callableStatement.registerOutParameter(3, OracleTypes.CURSOR);
            callableStatement.execute();
            resultSet = (ResultSet) callableStatement.getObject(3);
            System.out.println(resultSet);

            while (resultSet.next()){
                detail= new TransactionRespCountModel();
                detail.setTransactionChannel(resultSet.getString("channels"));
                response.add(detail);

            }
        }
        catch (Exception e){
            e.printStackTrace();
        }finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }
        return response;
    }



}


