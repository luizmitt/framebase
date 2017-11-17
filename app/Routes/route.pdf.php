<?php

use \Routing\Router;
use \App\Pdf\PdfMinutaAditivoContrato;
use \App\Pdf\PdfMinutaApostilamento;
use \App\Pdf\PdfMinutaTermoRescisao;

Router::get('/pdfs/aditivo', function() {
	$pdf = new PdfMinutaAditivoContrato();
	$pdf->configure();
});
Router::get('/pdfs/apostilamento', function() {
	$pdf = new PdfMinutaApostilamento();
	$pdf->configure();
});
Router::get('/pdfs/rescisao', function() {
	$pdf = new PdfMinutaTermoRescisao();
	$pdf->configure();
});
