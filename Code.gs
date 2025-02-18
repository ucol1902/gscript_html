function doGet() {
  return HtmlService.createTemplateFromFile('FormMain').evaluate()
    .setTitle('Input Hasil Pemeriksaan');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getAllCustomerData() {
  var sheet = SpreadsheetApp.openById("1PUUFfOVgPz-Hs4_tu3O7Z9leK2eKERO5GOnj0ZsTnSI").getSheetByName("RKR");
  var data = sheet.getRange("A5:U" + sheet.getLastRow()).getValues(); // Ambil data sampai kolom U
  var customerData = {};

  data.forEach(function(row, index) {
    var idPelanggan = row[0].toString().trim();
    var rowNumber = index + 5; // Karena mulai dari A5

    if (idPelanggan) {
      customerData[idPelanggan] = { rowNumber: rowNumber };
      for (var i = 1; i < row.length; i++) { // Mulai dari kolom B (indeks 1)
        customerData[idPelanggan]["data" + (i + 1)] = row[i] || ""; // Mulai dari data2, data3, dst.
      }
    }
  });

  return customerData;
}

function submitForm(formData) {
  try {
    var folderId = "1XpUmSoB-BEz1j5lmzuqHfKIkMMOiXALB"; // Ganti dengan ID folder tujuan
    var folder = DriveApp.getFolderById(folderId);
    
    // Simpan file PDF ke Google Drive
    var fileBlob = Utilities.newBlob(Utilities.base64Decode(formData.fileData), "application/pdf", formData.fileName);
    var file = folder.createFile(fileBlob);
    var fileUrl = file.getUrl(); // Link file di Drive
    var row = formData.rowNumber;

    // Simpan data ke Google Sheets
    var sheet = SpreadsheetApp.openById("1PUUFfOVgPz-Hs4_tu3O7Z9leK2eKERO5GOnj0ZsTnSI").getSheetByName("RKR"); // Sesuaikan nama sheet
    sheet.getRange(row,22).setValue (formData.merkMeterpemeriksaan);
    sheet.getRange(row,23).setValue (formData.nomorMeter);
    sheet.getRange(row,24).setValue (formData.konstruksiAPP);
    sheet.getRange(row,25).setValue (formData.rprimer);
    sheet.getRange(row,26).setValue (formData.sprimer);
    sheet.getRange(row,27).setValue (formData.tprimer);
    sheet.getRange(row,28).setValue (formData.rsprimer);
    sheet.getRange(row,29).setValue (formData.rtprimer);
    sheet.getRange(row,30).setValue (formData.stprimer);
    sheet.getRange(row,31).setValue (formData.cosphiprimer);
    sheet.getRange(row,32).setValue (formData.rsekunder);
    sheet.getRange(row,33).setValue (formData.ssekunder);
    sheet.getRange(row,34).setValue (formData.tsekunder);
    sheet.getRange(row,35).setValue (formData.rssekunder);
    sheet.getRange(row,36).setValue (formData.rtsekunder);
    sheet.getRange(row,37).setValue (formData.stsekunder);
    sheet.getRange(row,38).setValue (formData.cosphisekunder);
    sheet.getRange(row,39).setValue (formData.errorkwh);
    sheet.getRange(row,40).setValue (formData.ctprimer);
    sheet.getRange(row,41).setValue (formData.ctsekunder);
    sheet.getRange(row,42).setValue (formData.ptprimer);
    sheet.getRange(row,43).setValue (formData.ptsekunder);
    sheet.getRange(row,45).setValue (formData.errorCTR);
    sheet.getRange(row,46).setValue (formData.errorCTS);
    sheet.getRange(row,47).setValue (formData.errorCTT);
    sheet.getRange(row,51).setValue (Utilities.formatDate(new Date(), "GMT+7:00", "M/d/yyyy"));
    sheet.getRange(row,52).setValue (formData.rekomendasi);
    sheet.getRange(row,53).setValue (formData.potensikwh);
    sheet.getRange(row,55).setValue (fileUrl);

    return "Data " + formData.customerId + " " + formData.name +" berhasil disimpan...";
  } catch (error) {
    return "Terjadi kesalahan: " + error.toString();
  }
}
