import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';



@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  constructor() { }


  exportAsExcelFileForArray(json: any[], excelFileName: string, sheetTitle: string, header: any[]): string {
     //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(header);
   XLSX.utils.sheet_add_json(worksheet, json, { skipHeader: true, origin: "A2" });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, sheetTitle);
    XLSX.writeFile(wb, `${excelFileName}${new Date().toDateString()}.xlsx`);
    return `${excelFileName}.xlsx successfully exported`

  }
  exportAsExcelFileForHTML(html: string, excelFileName: string, sheetTitle: string): string {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(html);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, sheetTitle);
    XLSX.writeFile(wb, `${excelFileName}${new Date().toDateString()}.xlsx`);
    return `${excelFileName}.xlsx successfully exported`

  }



}