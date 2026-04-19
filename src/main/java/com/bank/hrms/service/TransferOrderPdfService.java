package com.bank.hrms.service;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.repository.TransferRequestRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class TransferOrderPdfService {

    private final TransferRequestRepository transferRepo;

    public TransferOrderPdfService(TransferRequestRepository transferRepo) {
        this.transferRepo = transferRepo;
    }

    public ByteArrayInputStream generateTransferOrderPdf(Long id) {

        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD);
            Font normalFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL);
            Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);

            // Title
            Paragraph title = new Paragraph(
                    "ANDHRA PRADESH GRAMEENA BANK\nHEAD OFFICE - GUNTUR\nTRANSFER ORDER",
                    titleFont
            );
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Date (Right Side)
            String todayDate = java.time.LocalDate.now()
                    .format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

            Paragraph date = new Paragraph("Date: " + todayDate, normalFont);
            date.setAlignment(Element.ALIGN_RIGHT);
            date.setSpacingAfter(20);
            document.add(date);

            // To Section
            document.add(new Paragraph(
                    "To,\n" +
                            request.getEmployeeName() + "\n" +
                            request.getDesignation() + "\n" +
                            request.getCurrentBranch() + "\n" +
                            request.getCurrentRegion(),
                    normalFont
            ));

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Dear Sir,", normalFont));
            document.add(new Paragraph(" "));

            // Subject
            Paragraph subject = new Paragraph(
                    "Sub: Transfer Order - Reg.",
                    boldFont
            );
            subject.setSpacingAfter(10);
            document.add(subject);

            // Reference
            String referenceText =
                    "With reference to your transfer application bearing Request ID No. "
                            + request.getId()
                            + ", submitted for transfer request under "
                            + request.getPriorityType()
                            + " category, the competent authority has considered your request.";

            document.add(new Paragraph(referenceText, normalFont));
            document.add(new Paragraph(" "));

            // Main body
            String bodyText =
                    "You are hereby informed that your transfer request has been approved. "
                            + "You are posted to "
                            + request.getApprovedBranch()
                            + ", under "
                            + request.getApprovedRegion()
                            + ", with effect from "
                            + (request.getEffectiveTransferDate() != null
                            ? request.getEffectiveTransferDate().toString()
                            : "immediate effect")
                            + ".";

            document.add(new Paragraph(bodyText, normalFont));
            document.add(new Paragraph(" "));

            String remarksText =
                    "Remarks: "
                            + (request.getTransferRemarks() != null
                            ? request.getTransferRemarks()
                            : "As per administrative requirements.");

            document.add(new Paragraph(remarksText, normalFont));
            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "You are advised to hand over charge and report to the new place of posting immediately.",
                    normalFont
            ));

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Yours faithfully,", normalFont));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("General Manager", boldFont));
            document.add(new Paragraph("-sd/-", normalFont));

            document.close();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}