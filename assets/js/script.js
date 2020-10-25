const badgesFilter = document.querySelectorAll('.badge-filter');
const datasContainer = document.querySelector('.datas-container');
const tableHeader = document.querySelector('.table-header');
const inputSearch = document.getElementById('input-search');
const tableRow = document.querySelector('.table-row');
const btnCari = document.querySelector('.btn-cari');

inputSearch.addEventListener('keyup', function(element) {
	if(element.keyCode == '13') {
		tableHeader.innerHTMl = ``;
		datasContainer.innerHTMl = ``;
		let name = inputSearch.value;
		searchBasedOnProvince(name);
	}
})

btnCari.addEventListener('click', function() {
	tableHeader.innerHTMl = ``;
	datasContainer.innerHTMl = ``;
	let name = inputSearch.value;
	searchBasedOnProvince(name);
});

document.body.addEventListener('click', function(element) {
	if(element.target.classList.contains('badge-filter')) {
		element.preventDefault();
		badgesFilter.forEach(function(badgeFilter) {
			badgeFilter.classList.remove('active');
		});
		element.target.classList.add('active');

		let btnId = element.target.dataset.id;
		switch(btnId) {
			case '1' :
				tableHeader.innerHTMl = ``;
				datasContainer.innerHTMl = '';
				getAllCases();
				break;
			case '2' :
				tableHeader.innerHTML = '';
				datasContainer.innerHTMl = '';
				getCasesBasedOnAges();
				break;
			case '3' :
				tableHeader.innerHTML = '';
				datasContainer.innerHTML = '';
				getCasesBasedOnGender();
				break;
		}

	}
});	

function searchBasedOnProvince(name) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/prov.json', true);

	xhr.onload = function() {
		if(this.status == 200) {
			let result = JSON.parse(xhr.responseText);
			let datas = result.list_data;
			let tableHeaderData = `<tr>
					      <th scope="col">#</th>
					      <th scope="col">Provinsi</th>
					      <th scope="col">Jumlah Kasus</th>
					      <th scope="col">Sedang Dirawat</th>
					      <th scope="col">Sembuh</th>
					      <th scope="col">Meninggal</th>
					    </tr>`;
			let tableRows = ``;
			let index = 1;
			datas.forEach(function(data) {
				let capitalName = name.toUpperCase();
				let provinceName = data.key;
				if(provinceName.includes(capitalName)) {
				tableRows += `<tr><th scope="row">${index++}</th><td>${data.key}</td><td>${data.jumlah_kasus} <div class="badge badge-danger">+${data.penambahan.positif}</div></td><td>${data.jumlah_dirawat}</td><td>${data.jumlah_sembuh} <div class="badge badge-success">+${data.penambahan.sembuh}</div></td><td>${data.jumlah_meninggal} <div class="badge badge-danger">+${data.penambahan.meninggal}</div></td></tr>`;
				}
			})
			tableHeader.innerHTML = tableHeaderData;
			datasContainer.innerHTML = tableRows;
		}
	}

	xhr.send(); 
}

function getCasesBasedOnAges() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/prov.json', true);

	xhr.onload = function() {
		if(this.status == '200') {
			let result = JSON.parse(xhr.responseText);
			let datas = result.list_data;
			let tableRows = ``;
			let tableHeaderData = `<tr><th scope="col">#</th><th scope="col">Provinsi</th><th scope="col">Anak-anak</th><th scope="col">Dewasa</th><th scope="col">Lansia</th></tr>`;
			let index = 1;

			datas.forEach(function(data) {
				let kidsCategory = data.kelompok_umur[0].doc_count + data.kelompok_umur[1].doc_count;
				let adultsCategory = data.kelompok_umur[2].doc_count + data.kelompok_umur[3].doc_count + data.kelompok_umur[4].doc_count;
				let elderlyCategory = data.kelompok_umur[5].doc_count;
				tableRows += `<tr><th scope="row">${index++}</th><td>${data.key}</td><td>${kidsCategory}</td><td>${adultsCategory}</td><td>${elderlyCategory}</td></tr>`;
			});
			
			tableHeader.innerHTML = tableHeaderData;
			datasContainer.innerHTML = tableRows;
		}
	}

	xhr.send();
}

function getAllCases() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/prov.json', true);

	xhr.onload = async function() {
		if(this.status == 200) {
			let result = JSON.parse(xhr.responseText);
			let datas = await result.list_data;
			let tableHeaderData = `<tr>
					      <th scope="col">#</th>
					      <th scope="col">Provinsi</th>
					      <th scope="col">Jumlah Kasus</th>
					      <th scope="col">Sedang Dirawat</th>
					      <th scope="col">Sembuh</th>
					      <th scope="col">Meninggal</th>
					    </tr>`;
			let tableRows = ``;
			let index = 1;
			datas.forEach(function(data) {
				tableRows += `<tr><th scope="row">${index++}</th><td>${data.key}</td><td>${data.jumlah_kasus} <div class="badge badge-danger">+${data.penambahan.positif}</div></td><td>${data.jumlah_dirawat}</td><td>${data.jumlah_sembuh} <div class="badge badge-success">+${data.penambahan.sembuh}</div></td><td>${data.jumlah_meninggal} <div class="badge badge-danger">+${data.penambahan.meninggal}</div></td></tr>`;
			})
			tableHeader.innerHTML = tableHeaderData;
			datasContainer.innerHTML = tableRows;
		}
	}

	xhr.send(); 
}

function getCasesBasedOnGender() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/prov.json', true);

	xhr.onload = function() {
		if(this.status == 200) {
			let result = JSON.parse(xhr.responseText);
			let datas = result.list_data;
			let tableRows = ``;
			let tableHeaderData = `<tr><th scope="col">#</th><th scope="col">Provinsi</th><th scope="col">Laki-laki</th><th scope="col">Wanita</th></tr>`;
			let index = 1;

			datas.forEach(function(data) {
				let maleTotal = data.jenis_kelamin[0].doc_count;
				let femaleTotal = data.jenis_kelamin[1].doc_count;
				tableRows += `<tr><th scope="row">${index++}</th><td>${data.key}</td><td>${maleTotal}</td><td>${femaleTotal}</td></tr>`;

				tableHeader.innerHTML = tableHeaderData;
				datasContainer.innerHTML = tableRows;
			});
		}
	}

	xhr.send();
}

function showTable(tableHeaderData, tableRowsDatas) {
	tableHeader.innerHTML = tableHeader;
	datasContainer.innerHTML = tableRowsDatas;
}

getAllCases();

// const navLinks = document.querySelectorAll('.nav-link');
// const bodyTwo = document.querySelector('.body-two');

// document.body.addEventListener('click', function(element) {
// 	if(element.target.classList.contains('nav-link')) {
// 		element.preventDefault();
// 		navLinks.forEach(function(navLink) {
// 			navLink.classList.remove('active');
// 		})

// 		element.target.classList.add('active');

// 		if(element.target.innerHTML == 'Home') {
// 			bodyTwo.innerHTML = `<nav class="navbar navbar-expand-lg navbar-white bg-white fixed-top">
// 		<div class="container">
// 		  <a class="navbar-brand text-dark" href="#">COVIData</a>
// 		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
// 		    <span class="navbar-toggler-icon"></span>
// 		  </button>
// 		  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
// 		    <div class="navbar-nav ml-auto">
// 		      <a class="nav-link text-dark active" href="#">Home</a>
// 		      <a class="nav-link text-dark" href="#data">Data</a>
// 		      <a class="nav-link text-dark" href="#">Tentang</a>
// 		    </div>
// 		  </div>
// 		</div>
// 	</nav>

// 	<div class="jumbotron jumbotron-fluid header-jumbotron">
// 	  <div class="container">
// 	  	<div class="row d-flex align-items-center">
// 	  		<div class="col-12 d-flex justify-content-center d-md-none rotate-img">
// 	  			<img src="assets/img/illustration5.png" class="img-custom">
// 	  		</div>
// 	  		<div class="col-12 col-md-8" data-aos="fade-right" data-aos-duration="4000">
// 	  			<h1>Data Pasien COVID-19 Indonesia</h1>
// 	  			<p>Gunakan data berikut untuk kepentingan penelitian maupun sebagai sumber informasi terpadu.</p>
// 	  		</div>
// 	  		<div class="d-none d-md-block col-md-4 rotate-img">
// 	  			<img src="assets/img/illustration5.png" class="img-custom">
// 	  		</div>
// 	  	</div>
// 	  </div>
// 	</div>

// 	<div class="container info-bar-container" data-aos="zoom-out" data-aos-duration="4000">
// 		<div class="row">
// 			<div class="col-lg-8 mx-auto">
// 				<div class="info-bar row d-flex align-items-center">
// 					<div class="col-4">
// 						<h3 class="text-center">333,449</h3>
// 						<h5 class="text-center">Jumlah Kasus</h5>
// 					</div>
// 					<div class="col-4">
// 						<h3 class="text-center text-green">255,027</h3>
// 						<h5 class="text-center">Sembuh</h5>
// 					</div>
// 					<div class="col-4">
// 						<h3 class="text-center">11,844</h3>
// 						<h5 class="text-center">Meninggal</h5>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>

// 	<section class="datas">
// 		<div class="container mt-5">
// 			<div class="row data-row">
// 				<div class="col mx-auto d-flex justify-content-center" data-aos="zoom-out" data-aos-duration="3000">
// 					<h1 class="text-as-bg">Data</h1>
// 				</div>
// 			</div>
// 			<div class="row">
// 				<div class="col" data-aos="zoom-in" data-aos-duration="4000">
// 					<h1 class="text-center">Data</h1>
// 					<hr>
// 				</div>
// 			</div>
// 			<div class="row mt-5">
// 				<div class="col-3 col-lg-2 d-flex justify-content-center align-items-center">
// 					<button class="btn badge badge-filter active" data-id="1">Semua</button>
// 				</div>
// 				<div class="col-3 col-lg-2 d-flex justify-content-center align-items-center">
// 					<button class="btn badge badge-filter" data-id="2">Kelompok Umur</button>
// 				</div>
// 				<div class="col-3 col-lg-2 d-flex justify-content-center align-items-center">
// 					<button class="btn badge badge-filter" data-id="3">Jenis Kelamin</button>
// 				</div>
// 				<div class="col-12 col-lg-4 ml-auto">
// 					<div class="input-group">
// 					  <input type="text" class="form-control" placeholder="Ketik Nama Provinsi....." id="input-search">
// 					</div>
// 				</div>
// 			</div>
// 			<div class="row mt-3 table-row">
// 				<div class="col">
// 					<div class="table-responsive">
// 						<table class="table">
// 						  <thead class="table-header">
// 						    <tr>
// 						      <th scope="col">#</th>
// 						      <th scope="col">Provinsi</th>
// 						      <th scope="col">Jumlah Kasus</th>
// 						      <th scope="col">Sedang Dirawat</th>
// 						      <th scope="col">Sembuh</th>
// 						      <th scope="col">Meninggal</th>
// 						    </tr>
// 						  </thead>
// 						  <tbody class="datas-container">
// 						  </tbody>
// 						</table>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</section>

// 	<section class="pengenalan p-5">
// 		<div class="container mt-5">
// 			<div class="row d-flex justify-content-center flex-column">
// 				<div class="col" data-aos="fade-up" data-aos-duration="3000">
// 					<h1 class="text-center">Apa Itu COVID 19?</h1>
// 					<hr>
// 					<a href="#" class="btn badge badge-danger badge-edukasi">Edukasi</a>
// 				</div>
// 			</div>
// 			<div class="row">
// 				<div class="col-12 col-lg-4 float-right" data-aos="fade-right" data-aos-duration="3000">
// 					<img src="assets/img/illustration8.svg" class="img-fluid">
// 				</div>
// 				<div class="col-lg-8" data-aos="fade-left" data-aos-duration="3000">
// 					<p>COVID-19 adalah virus berbahaya yang menyerang sistem pernapasan makhluk hidup. Virus ini melanda dunia sejak Desember 2019 hingga saat ini. Virus ini dapat menular melalui cairan tubuh maupun kontak fisik langsung. Hingga kini, vaksin untuk mencegah virus ini belum ditemukan.</p>
// 					<p>Beberapa orang yang terpapar virus ini menunjukkan beberapa gejala seperti batuk, pilek, sakit tenggorokan, demam tinggi, kehilangan kemampuan mencium bau, sesak napas, dll namun ada juga beberapa orang tidak menunjukkan gejala apapun. Gejala tidak dapat menjadi indikator yang akurat, akan tetapi lebih baik untuk kita berwaspada terhadap stamina dan kesehatan tubuh sendiri. Jika anda merasakan gejala-gejala tersebut dan merasakan ada hal yang tidak biasa terjadi pada tubuh anda, segera lakukan rapid test maupun swab test. Semakin cepat terdeteksi, semakin tinggi juga peluang untuk paru-paru anda pulih. Jangan panik.</p>
// 					<p>Pandemi ini akan usai bila setiap dari kita mau bekerja sama untuk menerapkan protokol kesehatan seperti: mencuci tangan, menggunakan masker, jaga jarak dan tidak keluar apabila tidak memiliki kepentingan yang mendesak. Tetap #cuciTangan, #jagaJarak dan lakukan kegiatan #dariRumah</p>
// 				</div>
// 			</div>
// 		</div>
// 	</section>

// 	<section class="petunjuk">
// 		<div class="container mt-5">
// 			<div class="row">
// 				<div class="col d-flex justify-content-center" data-aos="zoom-out" data-aos-duration="4000">
// 					<h1 class="text-as-bg-two">Petunjuk</h1>
// 				</div>
// 			</div>
// 			<div class="row">
// 				<div class="col" data-aos="zoom-in" data-aos-duration="3000">
// 					<h1 class="text-center">Petunjuk</h1>
// 					<a href="#" class="btn badge badge-danger badge-edukasi">Petunjuk</a>
// 				</div>
// 			</div>
// 			<div class="row mt-5">
// 				<div class="col-4 d-flex justify-content-center">
// 					<div class="card" style="width: 15rem;" data-aos="flip-up" data-aos-duration="2000">
// 					  <img src="assets/img/illustration1.svg" class="card-img-top img-petunjuk" alt="...">
// 					  <div class="card-body">
// 					    <p class="card-text">Jaga Jarak & Gunakan Masker</p>
// 					  </div>
// 					</div>
// 				</div>
// 				<div class="col-4 d-flex justify-content-center">
// 					<div class="card" style="width: 15rem;" data-aos="flip-up" data-aos-duration="2500">
// 					  <img src="assets/img/illustration3.svg" class="card-img-top img-petunjuk" alt="...">
// 					  <div class="card-body">
// 					    <p class="card-text">Jaga Kebersihan & Cuci Tangan Setelah Menyentuh Benda Sekita</p>
// 					  </div>
// 					</div>
// 				</div>
// 				<div class="col-4 d-flex justify-content-center">
// 					<div class="card" style="width: 15rem;" data-aos="flip-up" data-aos-duration="3000">
// 					  <img src="assets/img/illustration2.svg" class="card-img-top img-petunjuk" alt="...">
// 					  <div class="card-body">
// 					    <p class="card-text">Tetap Di Rumah #BelajarDariRumah #KerjaDariRumah #IbadahDariRumah</p>
// 					  </div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</section>

// 	<section class="gejala">
// 		<div class="container">
// 			<div class="row">
// 				<div class="col d-flex justify-content-center" data-aos="zoom-out" data-aos-duration="3000">
// 					<h3 class="text-as-bg">Gejala</h3>
// 				</div>
// 			</div>
// 			<div class="row">
// 				<div class="col" data-aos="zoom-in" data-aos-duration="4000">
// 					<h1 class="text-center">Gejala</h1>
// 					<a href="#" class="btn badge badge-danger">Gejala</a>
// 				</div>
// 			</div>
// 			<div class="row d-flex align-items-center mt-5">
// 				<div class="col-4 d-flex justify-content-center" data-aos="fade-right" data-aos-duration="3000">
// 					<img src="assets/img/illustration7.svg" class="img-fluid">
// 				</div>
// 				<div class="col-8 d-flex justify-content-center" data-aos="fade-left" data-aos-duration="3000">
// 					<ul>
// 						<li><h6>Batuk</h6></li>
// 						<li><h6>Pilek</h6></li>
// 						<li><h6>Demam</h6></li>
// 						<li><h6>Sakit Tenggorokan</h6></li>
// 						<li><h6>Kesulitan Bernapas</h6></li>
// 						<li><h6>Berkurangnya Kemampuan Mencium Bau</h6></li>
// 					</ul>
// 				</div>
// 			</div>
// 		</div>
// 	</section>

// 	<section class="contact mt-5">
// 		<div class="container">
// 			<div class="row">
// 				<div class="col" data-aos="fade-right" data-aos-duration="3000">
// 					<h1 class="text-center text-white">Contact</h1>
// 					<hr class="hr-white">
// 				</div>
// 			</div>
// 			<div class="row d-flex justify-content-center">
// 				<div class="col-md-8 col-lg-6">
// 					<form action="" class="d-flex justify-content-center flex-column">
// 						<div class="form-group" data-aos="flip-up" data-aos-duration="3000">
// 						    <label for="email" class="text-white">Your Email</label>
// 						    <input type="email" class="form-control" id="email" placeholder="name@example.com">
// 						</div>
// 						<div class="form-group" data-aos="flip-up" data-aos-duration="3000">
// 						    <label for="message" class="text-white">Message</label>
// 						    <textarea type="text" class="form-control" id="message" placeholder="name@example.com" cols="10" rows="3"></textarea>
// 						</div>
// 						<button class="btn btn-primary" data-aos="flip-up" data-aos-duration="3000">Send</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	</section>

// 	<section class="footer">
// 		<div class="container p-5">
// 			<div class="row d-flex align-items-center">
// 				<div class="col-md-6">
// 					<h6 class="text-white">All Rights Reserved By Jesslyn Yang</h6>
// 				</div>
// 				<div class="col-md-6 d-md-flex justify-content-end">
// 					<p class="text-white">Made in Medan, Indonesia</p>
// 				</div>
// 			</div>
// 		</div>
// 	</section>`;
// 		} 

// 		if(element.target.innerHTML == 'Tentang') {
// 			console.log('tentang');
// 			bodyTwo.innerHTML = `<nav class="navbar navbar-expand-lg navbar-white bg-white fixed-top">
// 					<div class="container">
// 					  <a class="navbar-brand text-dark" href="#">COVIData</a>
// 					  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
// 					    <span class="navbar-toggler-icon"></span>
// 					  </button>
// 					  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
// 					    <div class="navbar-nav ml-auto">
// 					      <a class="nav-link text-dark active" href="#">Home</a>
// 					      <a class="nav-link text-dark" href="#data">Data</a>
// 					      <a class="nav-link text-dark" href="#">Tentang</a>
// 					    </div>
// 					  </div>
// 					</div>
// 				</nav>

// 				<div class="jumbotron jumbotron-fluid header-jumbotron about-jumbotron">
// 				  <div class="container">
// 				  	<div class="row mt-3">
// 				  		<div class="col d-flex justify-content-center flex-column">
// 				  			<h1 class="text-center">About</h1>
// 				  			<hr class="hr-custom">
// 				  		</div>
// 				  	</div>
// 				  	<div class="row d-flex align-items-center">
// 				  		<div class="col-12 d-flex justify-content-center d-md-none rotate-img">
// 				  			<img src="assets/img/illustration5.png" class="img-custom">
// 				  		</div>
// 				  		<div class="col-12 col-md-8" data-aos="fade-right" data-aos-duration="4000">
// 				  			<div class="row">
// 				  				<div class="col">
// 						  			<p class="text-dark">Halo, nama saya Jesslyn. Saat ini, saya sedang duduk di bangku SMA. Kesibukan saya selain sebagai seorang pelajar adalah mengembangkan website. Bagi saya, membuat website adalah sesuatu yang sangat saya cintai dan saya tidak akan berhenti belajar.</p>
// 						  			<hr>
// 						  			<h5 class="mt-5">Connect with me!</h5>
// 				  				</div>
// 				  			</div>
// 				  			<div class="row mt-3">
// 				  				<div class="col-6 col-lg-4">
// 						  			<a href="https://wa.link/7kan3w">
// 							  			<img src="assets/img/logo/whatsapp.png" class="img-logo">
// 							  			<p class="text-success d-inline-block">Whatsapp</p>
// 						  			</a>
// 				  				</div>
// 				  				<div class="col-6 col-lg-4">
// 						  			<a href="https://instagram.com/jesslynnyang">
// 							  			<img src="assets/img/logo/instagram.png" class="img-logo">
// 							  			<p class="text-danger d-inline-block">Instagram</p>
// 						  			</a>
// 				  				</div>
// 				  			</div>
// 				  		</div>
// 				  		<div class="d-none d-md-block col-md-4 rotate-img">
// 				  			<img src="assets/img/illustration5.png" class="img-custom">
// 				  		</div>
// 				  	</div>
// 				  </div>
// 				</div>

// 				<section class="footer" style="margin-top: -100px;">
// 					<div class="container p-5 mt-5">
// 						<div class="row d-flex align-items-center">
// 							<div class="col-md-6">
// 								<h6 class="text-white">All Rights Reserved By Jesslyn Yang</h6>
// 							</div>
// 							<div class="col-md-6 d-md-flex justify-content-end">
// 								<p class="text-white">Made in Medan, Indonesia</p>
// 							</div>
// 						</div>
// 					</div>
// 				</section>`;
// 		}
// 	}
// })