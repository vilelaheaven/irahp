 
// copiando conteúdo do carrinho, quantidade de itens
// criando a função para criar um "aguarde o elemento carregar"
function waitForElement(elementPath, callBack){
  window.setTimeout(function(){
    if($(elementPath).length){
      callBack(elementPath, $(elementPath));
    }else{
      waitForElement(elementPath, callBack);
    }
  },500)
}
// usa a função WaitElement para aguardar e depois de carregado o elemento disparar os códigos abaixo para quantidade de item
// repetindo estes dois comandos para executar uma vez ao carregar a página
waitForElement(".amount-items .amount-items-em",function(){
// limpa sacola
    $(".quantidade-itens-sacola").empty();
// copia a div
$('.amount-items .amount-items-em').clone().appendTo('.quantidade-itens-sacola');

// agora só vai executar as funções quando o conteúdo da classe for modificado
 $('.amount-items .amount-items-em').bind("DOMSubtreeModified",function(){
// esvazia o conteudo da div primeiro
$(".quantidade-itens-sacola").empty();
// copia conteudo de uma div (com classe amount-items-em) da vtex e cola em outro local
$('.amount-items .amount-items-em').clone().appendTo('.quantidade-itens-sacola');
    });
});


// usa a função criada WaitElement para aguardar e depois de carregado o elemento disparar os códigos abaixo, para valor total do carrinho

waitForElement(".total-cart .total-cart-em",function(){

// copiando o conteúdo valor do carrinho
// primeiro uma sequencia ao carregar a pagina
// esvazia o conteudo da div primeiro
$(".valor-total-sacola").empty();
// copia conteudo de uma div (com classe total-cart-em) da vtex e cola em outro local
$('.total-cart .total-cart-em').clone().appendTo('.valor-total-sacola');

// agora só vai executar a função quando o conteúdo da classe for modificado
 $('.total-cart .total-cart-em').bind("DOMSubtreeModified",function(){      
// esvazia o conteudo da div primeiro
$(".valor-total-sacola").empty();
// copia conteudo de uma div (com classe total-cart-em) da vtex e cola em outro local
$('.total-cart .total-cart-em').clone().appendTo('.valor-total-sacola');
    });

});

//Tira o "300" dos atributos, para a imagem poder ser auto-resize:
$('.div-foto-produto img').css({ 
  width: 'auto',
  height: 'auto'
});


//Faz as div caixa-produto pularem para class principal:
$('.caixa-produto').detach().appendTo('.section-catalogo-grade');
$('.caixa-produto').addClass('caixa-produto-alterado');
// se alterar conteudo da prateleira
$('.template-prateleira').bind("DOMSubtreeModified",function(){
$('.caixa-produto-alterado').remove();
// espera pelo elemento carregar
waitForElement(".caixa-produto",function(){
//dispara comandos
$('.caixa-produto').detach().appendTo('.section-catalogo-grade');
$('.caixa-produto').addClass('caixa-produto-alterado');
$('.div-foto-produto img').css({ 
  width: 'auto',
  height: 'auto'
});
    });
});


waitForElement(".searchResultsTime",function(){

// move o "produtos encontrados" para outra div
$('.searchResultsTime').detach().appendTo('.itens-quantidade');
// oculta "produtos encontrados" apenas o segundo item
$('.searchResultsTime:nth-child(2)').css({ 
  display:'none'
});
// renomeia para "produtos"
$(".resultado-busca-numero .label").text(" PRODUTOS");
// ajusta numero de produtos para direita
$('.resultado-busca-numero .label').css({ 
  float:'right'
});
// coloca uma margem pra separar quantidade de "produtos"
$('.resultado-busca-numero .value').css({ 
  margin:'6px'
});

// move "ordernar por" para outra div
$('.orderBy').detach().appendTo('.ordenacao-resultado');
// oculta "ordernar por" (apenas segundo item)
$('.orderBy:nth-child(2)').css({ 
  display:'none'
});

// move escolha de paginas para outra div no fim da prateleira
$('.bottom').detach().appendTo('.div-escolha-de-pagina');

// oculta o que sobrou de main
$('.main').css({ 
  display:'none'
});
});

// joga o titulo da pagina pra dentro da h1
$('.titulo-sessao').detach().appendTo('.heading-8');
// faz o h2 (gerado pelo controller de titulo de pagina da vtex) virar uma div
$(function () {
        $('.titulo-sessao').replaceWith(function () {
        return "<div>" + $(this).text() + "</div>";
    });
});


waitForElement(".section-faq",function(){
// adiciona a capacidade de se abrir uma tab através de um link (criado para página de duvidas)
var VhINFO = Webflow || [];
VhINFO.push(function () {
  var tabName = getParam('tab');
  if (!tabName) return;

  $('.' + tabName).triggerHandler('click');

  function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
});
});


if (!$(".container-subcategoria-rodape").length){
  $('.escolher-subcategoria').css({ 
  display:'none'
  });
}

if ($("body").hasClass("produto")) {
// adiciona classe ao botão de comprar da vtex 
$(document).ready( function() {
  $('.buy-button').addClass( 'botao-comprar-produto w-button' );
} );
}


if ($("body").hasClass("departamento:not(.produto)")) {
// FUNCIONAR TROCAR FOTO NO HOVER POR API NA VTEX
//criando um observador, que verifica mudanças no conteudo da div
var target = $( ".pager" )[0];
// Create an observer instance
var observer = new MutationObserver(function( mutations ) {
   mutations.forEach(function( mutation ) {
       var newNodes = mutation.addedNodes; // DOM NodeList
       if( newNodes !== null ) { // If there are new nodes added

        //aqui vai vem o conteudo do código
 setTimeout(function () {
// quando passa o mouse em cima de 1 foto na categoria, ele dispara o comando de hover em todas. 
 $('.div-produto-info').find('.div-foto-produto').hover(function () {

        $('.div-produto-info').each(function(index, element) {

            if ($(this).find('.second-image').length == 0) {

                var sku = $(this).find('.sku-id').text();
                var $this = $(this);
                $.get('/produto/sku/' + sku).success(function (data) {
                    if (data[0].Images[1] != undefined) {
                        $this.find('.segunda-imagem-hover img').attr('src', data[0].Images[1][0].Path);
                    } else {
                        $this.find('.segunda-imagem-hover img').attr('src', $this.find('.segunda-imagem-hover img').attr('src'));
                    }
                    $this.find('.segunda-imagem-hover img').addClass('second-image');
                })
            }
        })
})
   
    }, 1000);
        //aqui termina o conteudo do código, o resto é finalização do observador
      }
   });    
});
// Configuration of the observer:
var config = { 
    attributes: true, 
    childList: true, 
    characterData: true 
};
// Pass in the target node, as well as the observer options
observer.observe(target, config);
// Later, you can stop observing
// observer.disconnect();
// FINALIZADO FUNCIONAR TROCAR FOTO NO HOVER POR API NA VTEX

// chave abaixo fecha "if body has departamento"
 }


waitForElement(".zopim",function(){
  
// aplicando cores via api
$zopim.livechat.theme.setColor('#000000');
$zopim.livechat.theme.reload();
$zopim.livechat.window.setTitle('Ajuda Fashion Biju');
})
