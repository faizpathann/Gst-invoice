
document.getElementById("addItem").addEventListener("click", function () {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
        <input type="text" placeholder="Item name" class="description" required>
        <input type="number" placeholder="Quantity" class="quantity" required>
        <input type="number" placeholder="Price" class="unit-price" required>
        <button class="remove-item">Remove</button>
    `;

    document.querySelector(".item-details").insertBefore(itemDiv, this);
    
    itemDiv.querySelector(".remove-item").addEventListener("click", function() {
        itemDiv.remove();
        updateTotal();
    });

    // Add event listeners to new inputs
    itemDiv.querySelector(".quantity").addEventListener("input", updateTotal);
    itemDiv.querySelector(".unit-price").addEventListener("input", updateTotal);
});

// Initial event listener for existing input fields
document.querySelectorAll(".quantity, .unit-price").forEach(input => {
    input.addEventListener("input", updateTotal);
});

function updateTotal() {
    let totalGST = 0;
    let totalAmount = 0;

    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        const quantity = parseFloat(item.querySelector(".quantity").value) || 0;
        const unitPrice = parseFloat(item.querySelector(".unit-price").value) || 0;
        const totalPrice = quantity * unitPrice;
        const gst = totalPrice * 0.18; // Assuming 18% GST

        totalAmount =gst + totalPrice;
        totalGST = gst;
    });

    document.getElementById("totalGST").innerText = totalGST.toFixed(2);
    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
}
