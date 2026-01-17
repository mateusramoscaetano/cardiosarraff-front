import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Register fonts if needed
// Font.register({
//   family: 'Your-Font',
//   src: '/path/to/your/font.ttf'
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  value: {
    width: "70%",
  },
  textArea: {
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
    minHeight: 40,
    border: "1px solid #ccc",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
  },
  signature: {
    marginTop: 50,
    borderTop: "1px solid black",
    paddingTop: 10,
    width: "60%",
    textAlign: "center",
    alignSelf: "center",
  },
});

interface RequisitionPDFProps {
  data: {
    petName: string;
    petSpecies: string;
    petBreed: string;
    petAge: string;
    petGender: string;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    clinicalHistory: string;
    mainComplaint: string;
    physicalExam: string;
    suspectedDiagnosis: string;
    requestedExams: string;
    additionalInfo: string;
  };
  doctorName: string;
  clinicName: string;
}

export const RequisitionPDF: React.FC<RequisitionPDFProps> = ({
  data,
  doctorName,
  clinicName,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="/logo-white.png" style={styles.logo} />
        <Text>{format(new Date(), "dd/MM/yyyy")}</Text>
      </View>

      <Text style={styles.title}>REQUISIÇÃO DE EXAMES</Text>

      {/* Pet Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Pet</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{data.petName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Espécie:</Text>
          <Text style={styles.value}>{data.petSpecies}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Raça:</Text>
          <Text style={styles.value}>{data.petBreed}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Idade:</Text>
          <Text style={styles.value}>{data.petAge}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sexo:</Text>
          <Text style={styles.value}>{data.petGender}</Text>
        </View>
      </View>

      {/* Owner Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Proprietário</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{data.ownerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.value}>{data.ownerPhone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.ownerEmail}</Text>
        </View>
      </View>

      {/* Clinical Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Clínicas</Text>

        <Text style={styles.label}>História Clínica:</Text>
        <View style={styles.textArea}>
          <Text>{data.clinicalHistory}</Text>
        </View>

        <Text style={styles.label}>Queixa Principal:</Text>
        <View style={styles.textArea}>
          <Text>{data.mainComplaint}</Text>
        </View>

        <Text style={styles.label}>Exame Físico:</Text>
        <View style={styles.textArea}>
          <Text>{data.physicalExam}</Text>
        </View>

        <Text style={styles.label}>Diagnóstico Suspeito:</Text>
        <View style={styles.textArea}>
          <Text>{data.suspectedDiagnosis}</Text>
        </View>
      </View>

      {/* Exam Request */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Solicitação de Exames</Text>
        <View style={styles.textArea}>
          <Text>{data.requestedExams}</Text>
        </View>

        <Text style={styles.label}>Informações Adicionais:</Text>
        <View style={styles.textArea}>
          <Text>{data.additionalInfo}</Text>
        </View>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>{doctorName}</Text>
        <Text>Médico Veterinário</Text>
        <Text>{clinicName}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Documento gerado em {format(new Date(), "dd/MM/yyyy HH:mm")}
        </Text>
      </View>
    </Page>
  </Document>
);
