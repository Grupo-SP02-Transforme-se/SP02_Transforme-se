// ========================================
// SISTEMA DE DOWNLOADS - MATERIAIS
// ========================================

// Configuração dos arquivos para download
// Caminhos atualizados com os arquivos reais
const downloadFiles = {
    // PLANILHAS
    'planilha-mei': {
        file: 'assets/ebooks-e-planilhas/Controle de Faturamento l MEI.xlsx',
        filename: 'Controle_de_Faturamento_MEI.xlsx'
    },
    'quitacao-antecipada': {
        file: 'assets/ebooks-e-planilhas/Tabela Price e SAC (1).xlsx',
        filename: 'Tabela_Price_e_SAC.xlsx'
    },
    'orcamento-simplificado': {
        file: 'assets/ebooks-e-planilhas/ORCAMENTO_FAMILIAR (1).xlsx',
        filename: 'Orcamento_Familiar.xlsx'
    },
    
    // E-BOOKS
    'ebook-reserva-emergencia': {
        file: 'assets/ebooks-e-planilhas/Guia-Definitivo-da-Reserva-de-Emergencia.pdf',
        filename: 'Guia_Definitivo_da_Reserva_de_Emergencia.pdf'
    },
    'ebook-cartao-credito': {
        file: 'assets/ebooks-e-planilhas/Guia-do-Cartao-de-Credito-De-Vilao-a-Aliado.pdf',
        filename: 'Guia_do_Cartao_de_Credito.pdf'
    },
    'ebook-sair-dividas': {
        file: 'assets/ebooks-e-planilhas/Liberdade-Financeira-Como-Sair-das-Dividas-em-10-Passos.pdf',
        filename: 'Liberdade_Financeira_Como_Sair_das_Dividas.pdf'
    }
};

// Função para fazer o download
function downloadFile(fileKey) {
    const fileData = downloadFiles[fileKey];
    
    if (!fileData) {
        console.error('Arquivo não encontrado:', fileKey);
        alert('Erro ao baixar o arquivo. Tente novamente.');
        return;
    }
    
    // Criar elemento de link temporário
    const link = document.createElement('a');
    link.href = fileData.file;
    link.download = fileData.filename;
    
    // Adicionar ao DOM, clicar e remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback visual (opcional)
    console.log('Download iniciado:', fileData.filename);
}

// Função para compartilhar (Web Share API)
function shareContent(title, text) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: window.location.href
        })
        .then(() => console.log('Compartilhamento realizado com sucesso'))
        .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
        // Fallback: copiar link para clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Link copiado para a área de transferência!');
            })
            .catch(() => {
                alert('Não foi possível compartilhar. Copie o link manualmente: ' + url);
            });
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Pegar todos os cards de materiais
    const materialCards = document.querySelectorAll('.material-card');
    
    materialCards.forEach((card, index) => {
        const downloadBtn = card.querySelector('.btn-download');
        const shareBtn = card.querySelector('.btn-share');
        const cardTitle = card.querySelector('.card-title').textContent;
        
        // Mapear cada card para sua chave de download
        let fileKey;
        switch(index) {
            case 0: fileKey = 'planilha-mei'; break;
            case 1: fileKey = 'quitacao-antecipada'; break;
            case 2: fileKey = 'orcamento-simplificado'; break;
            case 3: fileKey = 'ebook-reserva-emergencia'; break;
            case 4: fileKey = 'ebook-cartao-credito'; break;
            case 5: fileKey = 'ebook-sair-dividas'; break;
        }
        
        // Adicionar evento de download
        if (downloadBtn && fileKey) {
            downloadBtn.addEventListener('click', function() {
                downloadFile(fileKey);
                
                // Adicionar feedback visual
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Baixando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            });
        }
        
        // Adicionar evento de compartilhar
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                shareContent(
                    'FinUp - ' + cardTitle,
                    'Confira este material de educação financeira: ' + cardTitle
                );
            });
        }
    });
    
    // Toggle do menu mobile (mantendo o código existente)
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.close-button');

    if (menuButton && mobileMenu && closeButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuButton.classList.add('active');
        });

        closeButton.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuButton.classList.remove('active');
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });
    }
});

// ========================================
// INSTRUÇÕES DE USO
// ========================================
/*
✅ CONFIGURADO COM SEUS ARQUIVOS!

Estrutura atual:
assets/
  └── ebooks-e-planilhas/
      ├── Controle de Faturamento l MEI.xlsx
      ├── Tabela Price e SAC (1).xlsx
      ├── ORCAMENTO_FAMILIAR (1).xlsx
      ├── Guia-Definitivo-da-Reserva-de-Emergencia.pdf
      ├── Guia-do-Cartao-de-Credito-De-Vilao-a-Aliado.pdf
      └── Liberdade-Financeira-Como-Sair-das-Dividas-em-10-Passos.pdf

Para usar:
1. Salve este arquivo como "materiais.js" na raiz do projeto
2. Adicione no HTML antes do </body>: <script src="materiais.js"></script>
3. Remova o <script> que já existe no HTML (será substituído por este)
4. Pronto! Os downloads já estão funcionando! 🎉
*/