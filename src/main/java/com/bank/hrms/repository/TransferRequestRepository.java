package com.bank.hrms.repository;

import com.bank.hrms.model.TransferRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRequestRepository extends JpaRepository<TransferRequest, Long> {

    // Dashboard count methods
    Long countByFinalTransferStatus(String finalTransferStatus);

    Long countByOrderGeneratedStatus(String orderGeneratedStatus);

}