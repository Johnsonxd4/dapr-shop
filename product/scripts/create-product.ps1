$notebook = @{
    Id = '1';
    Name = 'Notebook';
    Description= 'Este notebook tem um review muito bom, vale a pena comprar ele'
}

$mouse = @{
    Id = '2';
    Name = 'Mouse';
    Description= 'Este mouse tem um review muito bom, vale a pena comprar ele'
}

$teclado = @{
    Id = '3';
    Name = 'teclado';
    Description= 'Este teclado tem um review muito bom, vale a pena comprar ele'
}

Write-Host "Criando notebook na base"
$json = $notebook | ConvertTo-Json
Write-Host $json
$params = @{
    Uri         = 'http://localhost:3500/v1.0/invoke/product/method/products'
    Method      = 'POST'
    Body        = $json
    ContentType = 'application/json'
}
Invoke-RestMethod @params

Write-Host "Criando mouse na base"
$json = $mouse | ConvertTo-Json
Write-Host $json
$params = @{
    Uri         = 'http://localhost:3500/v1.0/invoke/product/method/products'
    Method      = 'POST'
    Body        = $json
    ContentType = 'application/json'
}
Invoke-RestMethod @params

Write-Host "Criando teclado na base"
$json = $teclado | ConvertTo-Json
Write-Host $json
$params = @{
    Uri         = 'http://localhost:3500/v1.0/invoke/product/method/products'
    Method      = 'POST'
    Body        = $json
    ContentType = 'application/json'
}
Invoke-RestMethod @params