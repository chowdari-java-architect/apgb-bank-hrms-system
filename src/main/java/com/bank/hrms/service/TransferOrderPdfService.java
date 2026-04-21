package com.bank.hrms.service;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.repository.TransferRequestRepository;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Font;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.BaseFont;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class TransferOrderPdfService {

    private final TransferRequestRepository transferRepo;

    public TransferOrderPdfService(
            TransferRequestRepository transferRepo
    ) {
        this.transferRepo = transferRepo;
    }

    public ByteArrayInputStream generateTransferOrderPdf(Long id) {

        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(
                    BaseFont.createFont(),
                    14,
                    Font.BOLD
            );

            Font normalFont = new Font(
                    BaseFont.createFont(),
                    11,
                    Font.NORMAL
            );

            Paragraph bankTitle = new Paragraph(
                    "ANDHRA PRADESH GRAMEENA BANK",
                    titleFont
            );
            bankTitle.setAlignment(Element.ALIGN_CENTER);
            document.add(bankTitle);

            Paragraph office = new Paragraph(
                    "Head Office, Guntur, Andhra Pradesh",
                    normalFont
            );
            office.setAlignment(Element.ALIGN_CENTER);
            document.add(office);

            Paragraph dept = new Paragraph(
                    "HR Department - Transfer Order Section",
                    normalFont
            );
            dept.setAlignment(Element.ALIGN_CENTER);
            document.add(dept);

            document.add(new Paragraph(" "));
            document.add(new Paragraph(
                    "Ref No: APGB/HRD/TRF/" + request.getId() + "/2026",
                    normalFont
            ));

            document.add(new Paragraph(
                    "Date: " + request.getEffectiveDate(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "To,\nSri/Smt. " + request.getEmployeeName()
                            + "\n" + request.getDesignation()
                            + "\n" + request.getCurrentBranch(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Sub: Transfer Order - Posting Instructions",
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Dear Sir/Madam,",
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "With reference to your transfer request submitted on "
                            + request.getApprovalGround()
                            + " grounds, your request has been considered and approved.",
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "You are hereby transferred from:",
                    normalFont
            ));

            document.add(new Paragraph(
                    request.getCurrentRegion()
                            + " -> "
                            + request.getCurrentBranch(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "To:",
                    normalFont
            ));

            document.add(new Paragraph(
                    request.getApprovedRegion()
                            + " -> "
                            + request.getApprovedBranch(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Effective Date: " + request.getEffectiveDate(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "You are advised to report to the new place of posting immediately.",
                    normalFont
            ));

            document.add(new Paragraph(" "));
            document.add(new Paragraph(" "));
            document.add(new Paragraph(
                    "Yours Faithfully,",
                    normalFont
            ));

            document.add(new Paragraph(" "));
            document.add(new Paragraph(
                    "General Manager",
                    normalFont
            ));

            document.add(new Paragraph(
                    "-Sd-",
                    normalFont
            ));

            document.close();

        } catch (Exception e) {
            throw new RuntimeException("Error while generating PDF", e);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}