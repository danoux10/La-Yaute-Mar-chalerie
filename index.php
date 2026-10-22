<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>La Yaute Maréchalerie</title>

	<!-- CSS -->
	<link rel="stylesheet" href="style/style.css">
</head>

<body>

<!-- HEADER -->
<?php include __DIR__ . '/utility/header.html'; ?>

<main>

	<!-- BANNIÈRE -->
  <?php include __DIR__ . '/pages/banner.html'; ?>

	<!-- PRÉSENTATION -->
  <?php include __DIR__ . '/pages/presentation.html'; ?>

	<!-- PRESTATIONS -->
  <?php include __DIR__ . '/pages/prestation.html'; ?>

	<!-- INTERVENTIONS -->
  <?php include __DIR__ . '/pages/intervention.html'; ?>

	<!-- GALERIE -->
  <?php include __DIR__ . '/pages/galerie.html'; ?>

	<!-- À PROPOS -->
  <?php include __DIR__ . '/pages/propos.html'; ?>

	<!-- MENTIONS LÉGALES -->
  <?php include __DIR__ . '/pages/mentions-legales.html'; ?>

	<!-- CONFIDENTIALITÉ -->
  <?php include __DIR__ . '/pages/confidentialiter.html'; ?>

</main>

<!-- FOOTER -->
<?php include __DIR__ . '/utility/footer.html'; ?>

</body>
</html>