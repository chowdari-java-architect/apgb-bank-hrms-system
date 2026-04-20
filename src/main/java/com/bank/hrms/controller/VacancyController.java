package com.bank.hrms.controller;

import com.bank.hrms.model.VacancyMaster;
import com.bank.hrms.repository.VacancyMasterRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vacancies")
@CrossOrigin("*")
public class VacancyController {

    private final VacancyMasterRepository vacancyRepository;

    public VacancyController(VacancyMasterRepository vacancyRepository) {
        this.vacancyRepository = vacancyRepository;
    }

    // Create Vacancy
    @PostMapping
    public VacancyMaster createVacancy(
            @RequestBody VacancyMaster vacancy) {

        vacancy.setVacantPositions(
                vacancy.getSanctionedStrength()
                        - vacancy.getWorkingStrength()
        );

        return vacancyRepository.save(vacancy);
    }

    // Get All Vacancies
    @GetMapping
    public List<VacancyMaster> getAllVacancies() {
        return vacancyRepository.findAll();
    }

    // Update Vacancy
    @PutMapping("/{id}")
    public VacancyMaster updateVacancy(
            @PathVariable Long id,
            @RequestBody VacancyMaster updatedVacancy) {

        VacancyMaster vacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vacancy not found"));

        vacancy.setRegion(updatedVacancy.getRegion());
        vacancy.setBranchOrDepartment(updatedVacancy.getBranchOrDepartment());
        vacancy.setDesignation(updatedVacancy.getDesignation());
        vacancy.setScale(updatedVacancy.getScale());
        vacancy.setSanctionedStrength(updatedVacancy.getSanctionedStrength());
        vacancy.setWorkingStrength(updatedVacancy.getWorkingStrength());

        vacancy.setVacantPositions(
                updatedVacancy.getSanctionedStrength()
                        - updatedVacancy.getWorkingStrength()
        );

        vacancy.setVacancyStatus(updatedVacancy.getVacancyStatus());

        return vacancyRepository.save(vacancy);
    }

    // Delete Vacancy
    @DeleteMapping("/{id}")
    public void deleteVacancy(@PathVariable Long id) {
        vacancyRepository.deleteById(id);
    }

    @GetMapping("/check")
    public String checkVacancy(
            @RequestParam String region,
            @RequestParam String branch,
            @RequestParam String scale) {

        List<VacancyMaster> vacancies = vacancyRepository.findAll();

        for (VacancyMaster vacancy : vacancies) {
            if (
                    vacancy.getRegion().equalsIgnoreCase(region)
                            && vacancy.getBranchOrDepartment().equalsIgnoreCase(branch)
                            && vacancy.getScale().equalsIgnoreCase(scale)
            ) {
                if (vacancy.getVacantPositions() != null
                        && vacancy.getVacantPositions() > 0) {
                    return "VACANCY_AVAILABLE";
                } else {
                    return "NO_VACANCY";
                }
            }
        }

        return "NO_VACANCY";
    }
}