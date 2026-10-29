# Cria o atalho "Eldvar" na Area de Trabalho (2 cliques abrem o jogo)
$dir = $PSScriptRoot
$exe = Join-Path $dir 'node_modules\electron\dist\electron.exe'
if (-not (Test-Path $exe)) { Write-Host 'Electron nao encontrado. Rode JOGAR_SEM_INSTALAR.bat primeiro.'; exit 1 }
$ws = New-Object -ComObject WScript.Shell
$desk = [Environment]::GetFolderPath('Desktop')
$s = $ws.CreateShortcut((Join-Path $desk 'Eldvar.lnk'))
$s.TargetPath = $exe
$s.Arguments = '"' + $dir + '"'
$s.WorkingDirectory = $dir
$s.IconLocation = (Join-Path $dir 'eldvar.ico')
$s.Description = 'Eldvar - As Cronicas do Fim'
$s.Save()
Write-Host ('Atalho criado em: ' + $desk)
