import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

export const htmlToPDF = async (title: string = "Details", bgColor = "#fff") => {
    let pdfDom: HTMLElement | null = document.querySelector('.details') as HTMLElement
    pdfDom.style.padding = '20px 40px';
    const A4Width = 595.28;
    const A4Height = 841.89;
    let canvas = await html2canvas(pdfDom, {
        scale: 2,
        useCORS: true,
        backgroundColor: bgColor,
    });
    let pageHeight = (canvas.width / A4Width) * A4Height;
    let leftHeight = canvas.height;
    let position = 0;
    let imgWidth = A4Width;
    let imgHeight = (A4Width / canvas.width) * canvas.height;
    /*
     水印功能
    */
	const ctx: any = canvas.getContext('2d');
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.rotate((20 * Math.PI) / 180);
	ctx.font = '20px Microsoft Yahei';
	ctx.fillStyle = 'rgba(184, 184, 184, 0.8)';
	for (let i = canvas.width * -1; i < canvas.width; i += 240) {
	    for (let j = canvas.height * -1; j < canvas.height; j += 200) {
	        // 填充文字，x 间距, y 间距
	        ctx.fillText('blog.beetles.icu', i, j);
	    }
	}
   
	// ------------------------------------- 
    let pageData = canvas.toDataURL("image/jpeg", 1.0);
    let PDF = new jsPDF("p", 'pt', 'a4');
    if (leftHeight < pageHeight) {
        PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
    } else {
        while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= A4Height;
            if (leftHeight > 0) PDF.addPage();
        }
    }
	
	
    PDF.save(title + ".pdf");
}