$response = Invoke-RestMethod -Uri 'http://localhost:3501/v1.0/invoke/cart/method/add?productId=1&user=johnson' -Method Post
Write-Host $response