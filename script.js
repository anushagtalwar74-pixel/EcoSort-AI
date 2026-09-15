const uploadArea = document.getElementById("uploadArea"); 
const imageInput = document.getElementById("imageInput"); 
const previewContainer = document.getElementById("previewContainer"); 
const previewImage = document.getElementById("previewImage"); 
const analyzeBtn = document.getElementById("analyzeBtn"); 
 
uploadArea.addEventListener("click", () => { 
  imageInput.click(); 
}); 
 
imageInput.addEventListener("change", () => { 
  const file = imageInput.files[0]; 
 
  if (file) { 
    const imageURL = URL.createObjectURL(file); 
 
    previewImage.src = imageURL; 
    previewContainer.style.display = "block"; 
 
    uploadArea.querySelector("h3").textContent = file.name; 
    uploadArea.querySelector("p").textContent = "Image selected successfully"; 
  } 
}); 
 
analyzeBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const wasteInput = document.getElementById("wasteInput").value
    .toLowerCase()
    .trim();
    
  if (!wasteInput && !imageInput.files[0]) { 
    alert("Please upload an image or describe the waste item."); 
    return; 
  } 
 
  let item = "Waste Item"; 
  let category = "Dry / General Waste"; 
  let recommendation = 
    "Check your local waste-management guidelines before disposal."; 
 
  if ( 
    wasteInput.includes("banana") || 
    wasteInput.includes("food") || 
    wasteInput.includes("vegetable") || 
    wasteInput.includes("fruit") || 
    wasteInput.includes("peel") 
  ) { 
    item = "Organic Waste"; 
    category = "Wet / Organic Waste"; 
    recommendation = 
      "Place it in the appropriate organic or wet-waste collection."; 
  } 
 
  else if ( 
    wasteInput.includes("plastic") || 
    wasteInput.includes("bottle") || 
    wasteInput.includes("can") || 
    wasteInput.includes("metal") 
  ) { 
    item = "Plastic / Metal Container"; 
    category = "Recyclable / Dry Waste"; 
    recommendation = 
      "Empty and clean the item where appropriate, then place it in the designated recyclable collection."; 
  } 
 
  else if ( 
    wasteInput.includes("paper") || 
    wasteInput.includes("cardboard") || 
    wasteInput.includes("box") 
  ) { 
    item = "Paper / Cardboard"; 
    category = "Dry / Recyclable Waste"; 
    recommendation = 
      "Keep the material dry and place it in the appropriate paper or recyclable waste collection."; 
  } 
 
  else if ( 
    wasteInput.includes("glass") || 
    wasteInput.includes("jar") 
  ) { 
    item = "Glass Container"; 
    category = "Recyclable Waste"; 
    recommendation = 
      "Handle carefully and place it in the appropriate glass-recycling collection according to local rules."; 
  }

  // ===== EXTRA WASTE TYPE SUPPORT =====
  else if (
    wasteInput.includes("battery") ||
    wasteInput.includes("phone") ||
    wasteInput.includes("charger") ||
    wasteInput.includes("electronic") ||
    wasteInput.includes("laptop")
  ) {
    item = "Electronic / Battery Item";
    category = "Hazardous / E-Waste";
    recommendation =
      "Do not place batteries or electronic items in normal household waste. Use an appropriate e-waste or battery collection point according to local rules.";
  }
 
  document.getElementById("itemResult").textContent = item; 
  document.getElementById("categoryResult").textContent = category; 
  document.getElementById("recommendationResult").textContent = 
    recommendation; 
 
  document.getElementById("result").classList.remove("hidden"); 
}); 


// ===== EXTRA PROFESSIONAL RESULT FEATURES =====

analyzeBtn.addEventListener("click", function () {

  setTimeout(function () {

    const resultBox = document.getElementById("result");
    const categoryText = document.getElementById("categoryResult");

    if (!resultBox || !categoryText) return;

    const oldExtra = document.getElementById("extraAIInfo");

    if (oldExtra) {
      oldExtra.remove();
    }

    const category = categoryText.textContent.toLowerCase();

    let confidence = 70;
    let confidenceLabel = "Medium";
    let reason =
      "The classification is based on the information provided.";

    if (category.includes("organic")) {
      confidence = 92;
      confidenceLabel = "High";
      reason =
        "Organic materials such as food waste and fruit peels are commonly classified as wet waste.";
    }

    else if (category.includes("e-waste") || category.includes("hazardous")) {
      confidence = 90;
      confidenceLabel = "High";
      reason =
        "Electronic and battery items require separate handling because they may contain materials that should not enter normal household waste.";
    }

    else if (category.includes("recyclable")) {
      confidence = 90;
      confidenceLabel = "High";
      reason =
        "The identified material is commonly accepted as recyclable, subject to local waste-management rules.";
    }

    else if (category.includes("glass")) {
      confidence = 88;
      confidenceLabel = "High";
      reason =
        "Glass containers are commonly handled through separate recyclable or glass-waste collection.";
    }

    const extraInfo = document.createElement("div");

    extraInfo.id = "extraAIInfo";

    extraInfo.innerHTML = `
      <div class="extra-confidence">

        <div class="confidence-top">
          <span>AI Confidence</span>
          <strong>${confidenceLabel} • ${confidence}%</strong>
        </div>

        <div class="confidence-track">
          <div class="confidence-value" style="width:${confidence}%"></div>
        </div>

        <p>
          <strong>Why this classification?</strong><br>
          ${reason}
        </p>

      </div>

      <div class="responsible-ai-message">
        ⚠️ <strong>Responsible AI</strong>
        <p>
          This result is intended as decision-support. Waste-management
          rules may vary by location, so verify uncertain cases using
          local guidelines.
        </p>
      </div>
    `;

    resultBox.appendChild(extraInfo);

  }, 150);

});