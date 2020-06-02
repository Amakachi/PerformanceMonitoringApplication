package com.esc.rtserver.utilities;

import org.springframework.stereotype.Component;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

@Component
public class DbConnection {

    public void closeConnection(Connection conn, CallableStatement cStmt, ResultSet resultSet) {
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (cStmt != null) {
            try {
                cStmt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }
}
