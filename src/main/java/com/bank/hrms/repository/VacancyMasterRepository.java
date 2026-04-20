package com.bank.hrms.repository;

import com.bank.hrms.model.VacancyMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacancyMasterRepository
        extends JpaRepository<VacancyMaster, Long> {
}