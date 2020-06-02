package com.esc.rtserver.Dao;

import com.esc.rtserver.models.*;
import com.esc.rtserver.utilities.DbConnection;
import oracle.jdbc.internal.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.esc.rtserver.utilities.Cryptography;

import javax.sql.DataSource;

@Repository
public class SearchTransactionsDaoImpl {

    @Autowired
    private DbConnection dbconn;

    @Autowired
    @Qualifier("hikariCP")
    private DataSource dataSource;

    public List<SearchTransactionsProcedureModel> getSearchTransactions(String partner,String startDate, String endDate,
                                                                        BigDecimal recordLimit, String referenceNo,
                                                                        String senderId, String transactionChannel, String status, String sendOrReceive){

            Connection connection = null;
            CallableStatement callableStatement = null;
            ResultSet resultSet = null;

            List<SearchTransactionsProcedureModel> response = new ArrayList<>();
            SearchTransactionsProcedureModel detail = null;

            String encryptedReferenceNo = Cryptography.PBEncrypt(referenceNo);


            try {

                connection = dataSource.getConnection();
                String query = "{call eco_rt_partners_settlement_pkg.get_search_transactions(?,?,?,?,?,?,?,?,?,?)}";
                callableStatement = connection.prepareCall(query);

                callableStatement.setString(1, partner);
                callableStatement.setString(2, startDate);
                callableStatement.setString(3, endDate);
                callableStatement.setBigDecimal(4, recordLimit);
                callableStatement.setString(5, encryptedReferenceNo);
                callableStatement.setString(6, senderId);
                callableStatement.setString(7, transactionChannel);
                callableStatement.setString(8, status);
                callableStatement.setString(9, sendOrReceive);
                callableStatement.registerOutParameter(10, OracleTypes.CURSOR);

                callableStatement.execute();

                resultSet = (ResultSet) callableStatement.getObject(10);

                while (resultSet.next()) {
                    detail = new SearchTransactionsProcedureModel();

                    String decryptedReferenceNo = Cryptography.PBDecrypt(resultSet.getString("reference_no"));

                    detail.setSerial(resultSet.getBigDecimal("serial"));
                    detail.setTransactionId(resultSet.getBigDecimal("transaction_id"));
                    detail.setSenderId(resultSet.getString("sender_id"));
                    detail.setReceiverId(resultSet.getString("receiver_id"));
                    detail.setReferenceNo(decryptedReferenceNo);
                    detail.setTransactionDate(resultSet.getString("transaction_date"));
                    detail.setTransactionChannel(resultSet.getString("transaction_channel"));
                    detail.setReceiveChannel(resultSet.getString("receive_channel"));
                    detail.setAmount(resultSet.getString("amount"));
                    detail.setDestinationAffiliate(resultSet.getString("dest_affiliate"));
                    detail.setSourceAffiliate(resultSet.getString("source_affiliate"));
                  //  detail.setPartner(resultSet.getString("partner"));
                    detail.setTransactionStatus(resultSet.getString("transaction_status"));
                    detail.setResponseMessage(resultSet.getString("response_message"));

                    response.add(detail);

                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                dbconn.closeConnection(connection, callableStatement, resultSet);
            }

            return response;

    }


    public List<SearchByIdResponse> getSearchTransactionDetail(Double transId, String partner, String sendOrReceive){

            Connection connection = null;
            CallableStatement callableStatement = null;
            ResultSet resultSet = null;

            List<SearchByIdResponse> response = new ArrayList<>();
            SearchByIdResponse detail = null;

            try {

                connection = dataSource.getConnection();
                String query = "{call eco_rt_partners_settlement_pkg.get_search_transaction_detail(?,?,?,?)}";
                callableStatement = connection.prepareCall(query);

                callableStatement.setDouble(1, transId);
                callableStatement.setString(2, partner);
                callableStatement.setString(3, sendOrReceive);

                callableStatement.registerOutParameter(4, OracleTypes.CURSOR);

                callableStatement.execute();

                resultSet = (ResultSet) callableStatement.getObject(4);

                while (resultSet.next()) {
                    detail = new SearchByIdResponse();

                    detail.setTranId(resultSet.getBigDecimal("tran_id"));
                    detail.setExternalRef(resultSet.getString("external_Ref"));
                    detail.setSourceAffiliate(resultSet.getString("source_Affiliate"));
                    detail.setSendAmount(resultSet.getString("send_Amount"));
                    detail.setSourceCurrency(resultSet.getString("source_Currency"));
                    detail.setReceiveAmount(resultSet.getString("receive_Amount"));
                    detail.setDestinationCurrency(resultSet.getString("destination_Currency"));
                    detail.setReceiveDate(resultSet.getString("receive_Date"));
                    detail.setQueueState(resultSet.getString("queue_State"));

                    response.add(detail);

                }

            }catch (Exception e) {
                e.printStackTrace();
            } finally {
                dbconn.closeConnection(connection, callableStatement, resultSet);
            }

            return response;

    }


    public List<SenderKycDetails> getSenderKycDetails(String senderId){

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<SenderKycDetails> response = new ArrayList<>();
        SenderKycDetails detail = null;

        try {

            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_kyc_sender_details(?,?)}";
            callableStatement = connection.prepareCall(query);

            callableStatement.setString(1, senderId);
            callableStatement.registerOutParameter(2, OracleTypes.CURSOR);

            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(2);

            while (resultSet.next()) {
                detail = new SenderKycDetails();

                detail.setSenderId(resultSet.getString("sender_id"));
                detail.setFirstName(resultSet.getString("first_name"));
                detail.setLastName(resultSet.getString("last_name"));
                detail.setGender(resultSet.getString("gender"));
                detail.setEmailAddress(resultSet.getString("email_address"));
                detail.setMobilePhone(resultSet.getString("mobile_phone"));
                detail.setAffiliate(resultSet.getString("affiliate"));
                detail.setBranchCode(resultSet.getString("branch_code"));
                detail.setCustomerType(resultSet.getString("customer_type"));
                detail.setContactAddress(resultSet.getString("contact_address"));
                detail.setDateOfBirth(resultSet.getString("date_of_birth"));
                detail.setNationality(resultSet.getString("nationality"));
                detail.setCountry(resultSet.getString("country"));

                response.add(detail);

            }

        }catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;

    }


    public List<ReceiverKycDetails> getReceiverKycDetails(String receiverId) {

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<ReceiverKycDetails> response = new ArrayList<>();
        ReceiverKycDetails detail = null;

        try {

            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.get_kyc_receiver_details(?,?)}";
            callableStatement = connection.prepareCall(query);

            callableStatement.setString(1, receiverId);
            callableStatement.registerOutParameter(2, OracleTypes.CURSOR);

            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(2);

            while (resultSet.next()) {
                detail = new ReceiverKycDetails();

                detail.setReceiverId(resultSet.getString("receiver_id"));
                detail.setCustomerId(resultSet.getString("customer_id"));
                detail.setFirstName(resultSet.getString("first_name"));
                detail.setLastName(resultSet.getString("last_name"));
                detail.setIdentificationType(resultSet.getString("identification_type"));
                detail.setIdentificationNumber(resultSet.getString("identification_number"));
                detail.setPhoneNumber(resultSet.getString("phone_number"));
                detail.setEmailAddress(resultSet.getString("email_address"));

                response.add(detail);

            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;

    }


    public List<SearchTransactionsProcedureModel> getReportDetails(String partner,String startDate, String endDate,
                                                                        BigDecimal recordLimit, String referenceNo,
                                                                        String senderId, String transactionChannel, String status, String sendOrReceive){

        Connection connection = null;
        CallableStatement callableStatement = null;
        ResultSet resultSet = null;

        List<SearchTransactionsProcedureModel> response = new ArrayList<>();
        SearchTransactionsProcedureModel detail = null;

        String encryptedReferenceNo = Cryptography.PBEncrypt(referenceNo);


        try {

            connection = dataSource.getConnection();
            String query = "{call eco_rt_partners_settlement_pkg.GENERATE_TRANS_DETAILED_REPORT(?,?,?,?,?,?,?,?,?,?,?)}";
            callableStatement = connection.prepareCall(query);

            callableStatement.setString(1, partner);
            callableStatement.setString(2, startDate);
            callableStatement.setString(3, endDate);
            callableStatement.setBigDecimal(4, recordLimit);
            callableStatement.setString(5, encryptedReferenceNo);
            callableStatement.setString(6, senderId);
            callableStatement.setString(7, transactionChannel);
            callableStatement.setString(8, status);
            callableStatement.setString(9, sendOrReceive);
            callableStatement.registerOutParameter(10, OracleTypes.CURSOR);
            callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);

            callableStatement.execute();

            resultSet = (ResultSet) callableStatement.getObject(10);

            while (resultSet.next()) {
                detail = new SearchTransactionsProcedureModel();

                String decryptedReferenceNo = Cryptography.PBDecrypt(resultSet.getString("reference_no"));

                detail.setSerial(resultSet.getBigDecimal("serial"));
                detail.setTransactionId(resultSet.getBigDecimal("transaction_id"));
                detail.setSenderId(resultSet.getString("sender_id"));
                detail.setReferenceNo(decryptedReferenceNo);
                detail.setTransactionDate(resultSet.getString("transaction_date"));
                detail.setTransactionChannel(resultSet.getString("transaction_channel"));
                detail.setReceiverId(resultSet.getString("receiver_id"));
                detail.setSendAmount(resultSet.getString("send_amount"));
                detail.setSourceCurrency(resultSet.getString("source_currency"));
                detail.setReceiveAmount(resultSet.getString("receive_amount"));
                detail.setDestinationCurrency(resultSet.getString("destination_currency"));
                detail.setReceiveDate(resultSet.getString("receive_date"));
                detail.setReceiveChannel(resultSet.getString("receive_channel"));
                detail.setAmount(resultSet.getString("amount"));
                detail.setSourceAffiliate(resultSet.getString("source_affiliate"));
                detail.setDestinationAffiliate(resultSet.getString("dest_affiliate"));
                detail.setTransactionStatus(resultSet.getString("transaction_status"));
                detail.setResponseMessage(resultSet.getString("response_message"));

                response.add(detail);

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbconn.closeConnection(connection, callableStatement, resultSet);
        }

        return response;

    }


}
