var modal = document.querySelectorAll('ion-modal');

modal.forEach(modal => {
    modal.initialBreakpoint = 1;
    modal.breakpoints = [0, 1];
})



$(document).ready(function() {
    $('.btn-increment').on('click', function() {
        var $counterValue = $(this).siblings('.counter-value');
        var currentValue = parseInt($counterValue.val());
        $counterValue.val(currentValue + 1);
        $('.btn-decrement').removeClass("disabled")
    });

    $('.btn-decrement').on('click', function() {
        var $counterValue = $(this).siblings('.counter-value');
        var currentValue = parseInt($counterValue.val());
        
        if (currentValue > 1) {  // чтобы значение не уходило в ноль
            $counterValue.val(currentValue - 1);
        }
        if (currentValue - 1 < 2) {
            $(this).addClass("disabled")
        }
        
    });
});

