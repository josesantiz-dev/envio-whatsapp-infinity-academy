var navbar = ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="./src/css/style.css">
  <title>Menú</title>
</head>
<body>
    
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">  
    <a class="navbar-brand" href="index.html"> My App </a>  
    <button  
      class="navbar-toggler"  
      type="button"  
      data-toggle="collapse"  
      data-target="#navbarCollapse"  
      aria-controls="navbarCollapse"  
      aria-expanded="false"  
      aria-label="Toggle navigation">  
      <span class="navbar-toggler-icon"> </span>  
    </button>  
    <div class="collapse navbar-collapse" id="navbarCollapse">  
      <ul class="navbar-nav mr-auto sidenav" id="navAccordion">  
        <li class="nav-item active">  
          <a class="nav-link" href="index.html"><i class="fa-solid fa-house" style="color: #ffffff;"></i> Home</a>  
        </li>  
        <li class="nav-item">  
          <a class="nav-link" href="cuenta.html"><i class="fa-solid fa-user" style="color: #ffffff;"></i> Cuenta </a>  
        </li>  
        <li class="nav-item">  
          <a class="nav-link" href="contactos.html"><i class="fa-solid fa-address-book" style="color: #ffffff;"></i> Contactos </a>  
        </li>  
        <li class="nav-item">  
          <a class="nav-link" href="plantillas.html"><i class="fa-sharp fa-solid fa-file-invoice" style="color: #ffffff;"></i> Plantillas </a> 
        </li>  
        <li class="nav-item">  
          <a class="nav-link" href="campanas.html"><i class="fa-solid fa-flag-checkered" style="color: #ffffff;"></i> Campañas </a>  
        </li>  
        <li class="nav-item">  
          <a class="nav-link" href="informes.html"><i class="fa-solid fa-chart-simple" style="color: #ffffff;"></i> Informes </a>  
        </li>
      </ul>   
    </div>  
  </nav>   

</body>
</html>`;

        // inserting navbar in beginning of body
        document.body.insertAdjacentHTML("afterbegin", navbar);