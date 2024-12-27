let entries = [];
let totalIncome = 0;
let totalExpenses = 0;

function addEntry() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.querySelector('input[name="type"]:checked').value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please fill in both description and amount!");
        return;
    }

    const entry = {
        description,
        amount,
        type,
    };

    entries.push(entry);
    updateEntryList();
    resetFields();
}

function resetPage() {
    entries = [];
    updateEntryList();
    resetFields();
}

function resetFields() {
    document.getElementById("description").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("income").checked = true;
}

function updateEntryList() {
    const entryList = document.getElementById("entry-list");
    entryList.innerHTML = '';
    
    let filteredEntries = entries;

    const filterValue = document.querySelector('input[name="filter"]:checked').value;
    if (filterValue !== "all") {
        filteredEntries = entries.filter(entry => entry.type === filterValue);
    }

    filteredEntries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.classList.add(entry.type);

        li.innerHTML = `
            <span>${entry.description} - ₹${entry.amount}</span>
            <div>
                <button class="edit" onclick="editEntry(₹{index})">Edit</button>
                <button class="delete" onclick="deleteEntry(₹{index})">Delete</button>
            </div>
        `;
        entryList.appendChild(li);
    });

    calculateTotals();
}

function deleteEntry(index) {
    entries.splice(index, 1);
    updateEntryList();
}

function editEntry(index) {
    const entry = entries[index];
    document.getElementById("description").value = entry.description;
    document.getElementById("amount").value = entry.amount;
    document.querySelector(`input[name="type"][value="₹{entry.type}"]`).checked = true;
    
    deleteEntry(index); // Remove the entry to edit it
}

function calculateTotals() {
    totalIncome = 0;
    totalExpenses = 0;

    entries.forEach(entry => {
        if (entry.type === "income") {
            totalIncome += entry.amount;
        } else {
            totalExpenses += entry.amount;
        }
    });

    const netBalance = totalIncome - totalExpenses;

    document.getElementById("total-income").innerText = totalIncome.toFixed(2);
    document.getElementById("total-expenses").innerText = totalExpenses.toFixed(2);
    document.getElementById("net-balance").innerText = netBalance.toFixed(2);
}

// Add event listeners for filters
document.getElementById("all").addEventListener("change", updateEntryList);
document.getElementById("income-filter").addEventListener("change", updateEntryList);
document.getElementById("expense-filter").addEventListener("change", updateEntryList);

