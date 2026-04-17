package com.bank.hrms.service;

import com.bank.hrms.model.AuditLog;
import com.bank.hrms.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository repo;

    public void log(String action, String module, Long recordId,
                    String user, String role,
                    Object oldObj, Object newObj,
                    String status, String remarks) {

        try {
            AuditLog log = new AuditLog();

            log.setActionType(action);
            log.setModule(module);
            log.setRecordId(recordId);
            log.setPerformedBy(user);
            log.setRole(role);

            log.setOldData(oldObj != null ? oldObj.toString() : null);
            log.setNewData(newObj != null ? newObj.toString() : null);

            log.setStatus(status);
            log.setRemarks(remarks);

            repo.save(log);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}