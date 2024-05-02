function getInviteInfo() {
  var inviteLink = document.getElementById("inviteInput").value.trim();
  var inviteCode = inviteLink.split('/').pop();

  fetch(`https://discord.com/api/v9/invites/${inviteCode}`)
    .then(response => response.json())
    .then(data => {
      var inviteInfoDiv = document.getElementById("inviteInfo");
      inviteInfoDiv.innerHTML = '';

      // Server Icon
      var serverIcon = document.createElement("img");
      serverIcon.src = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`;
      serverIcon.classList.add("server-icon");
      inviteInfoDiv.appendChild(serverIcon);

      // Server Banner
      if (data.guild.banner) {
        var serverBanner = document.createElement("img");
        serverBanner.src = `https://cdn.discordapp.com/banners/${data.guild.id}/${data.guild.banner}.png`;
        serverBanner.classList.add("server-banner");
        inviteInfoDiv.appendChild(serverBanner);
      }

      // Server Splash
      if (data.guild.splash) {
        var serverSplash = document.createElement("img");
        serverSplash.src = `https://cdn.discordapp.com/splashes/${data.guild.id}/${data.guild.splash}.png`;
        serverSplash.classList.add("server-splash");
        inviteInfoDiv.appendChild(serverSplash);
      }

      // Server Info
      var serverInfo = document.createElement("div");
      serverInfo.classList.add("server-info");

      var serverName = document.createElement("h2");
      serverName.innerText = data.guild.name;
      serverInfo.appendChild(serverName);

      var serverDescription = document.createElement("p");
      serverDescription.innerText = data.guild.description;
      serverInfo.appendChild(serverDescription);

      inviteInfoDiv.appendChild(serverInfo);

      // Other Info
      var otherInfoContainer = document.createElement("div");
      otherInfoContainer.classList.add("other-info-container");

      // Invite Type
      var inviteType = document.createElement("div");
      inviteType.classList.add("info-field");
      inviteType.innerHTML = `<span class="field-label">Invite Type:</span> ${data.type}`;
      otherInfoContainer.appendChild(inviteType);

      // Invite Code
      var inviteCode = document.createElement("div");
      inviteCode.classList.add("info-field");
      inviteCode.innerHTML = `<span class="field-label">Invite Code:</span> ${data.code}`;
      otherInfoContainer.appendChild(inviteCode);

      // Expires At
      var expiresAt = document.createElement("div");
      expiresAt.classList.add("info-field");
      expiresAt.innerHTML = `<span class="field-label">Expires At:</span> ${data.expires_at || "Never"}`;
      otherInfoContainer.appendChild(expiresAt);

      // Guild ID
      var guildId = document.createElement("div");
      guildId.classList.add("info-field");
      guildId.innerHTML = `<span class="field-label">Guild ID:</span> ${data.guild_id}`;
      otherInfoContainer.appendChild(guildId);

      // Channel ID
      var channelId = document.createElement("div");
      channelId.classList.add("info-field");
      channelId.innerHTML = `<span class="field-label">Channel ID:</span> ${data.channel.id}`;
      otherInfoContainer.appendChild(channelId);

      // Channel Type
      var channelType = document.createElement("div");
      channelType.classList.add("info-field");
      channelType.innerHTML = `<span class="field-label">Channel Type:</span> ${data.channel.type}`;
      otherInfoContainer.appendChild(channelType);

      // Channel Name
      var channelName = document.createElement("div");
      channelName.classList.add("info-field");
      channelName.innerHTML = `<span class="field-label">Channel Name:</span> ${data.channel.name}`;
      otherInfoContainer.appendChild(channelName);

      // Premium Subscription Count
      var premiumSubscriptionCount = document.createElement("div");
      premiumSubscriptionCount.classList.add("info-field");
      premiumSubscriptionCount.innerHTML = `<span class="field-label">Premium Subscription Count:</span> ${data.guild.premium_subscription_count || "Not Found"}`;
      otherInfoContainer.appendChild(premiumSubscriptionCount);

      // NSFW
      var nsfw = document.createElement("div");
      nsfw.classList.add("info-field");
      nsfw.innerHTML = `<span class="field-label">NSFW:</span> ${data.guild.nsfw !== undefined ? data.guild.nsfw.toString() : "Not Found"}`;
      otherInfoContainer.appendChild(nsfw);

      // NSFW Level
      var nsfwLevel = document.createElement("div");
      nsfwLevel.classList.add("info-field");
      nsfwLevel.innerHTML = `<span class="field-label">NSFW Level:</span> ${data.guild.nsfw_level || "Not Found"}`;
      otherInfoContainer.appendChild(nsfwLevel);

      // Vanity URL Code
      var vanityUrlCode = document.createElement("div");
      vanityUrlCode.classList.add("info-field");
      vanityUrlCode.innerHTML = `<span class="field-label">Vanity URL Code:</span> ${data.guild.vanity_url_code || "Not Found"}`;
      otherInfoContainer.appendChild(vanityUrlCode);

      // Verification Level
      var verificationLevel = document.createElement("div");
      verificationLevel.classList.add("info-field");
      verificationLevel.innerHTML = `<span class="field-label">Verification Level:</span> ${data.guild.verification_level || "Not Found"}`;
      otherInfoContainer.appendChild(verificationLevel);

      // Features
      var features = document.createElement("div");
      features.classList.add("info-field");
      features.innerHTML = `<span class="field-label">Features:</span> ${data.guild.features ? data.guild.features.join(", ") : "Not Found"}`;
      otherInfoContainer.appendChild(features);

      inviteInfoDiv.appendChild(otherInfoContainer);

      // Create a copy button
      var copyBtn = document.createElement("button");
      copyBtn.innerText = "Copy";
      copyBtn.classList.add("copy-btn");
      copyBtn.onclick = function() {
        var textarea = document.createElement("textarea");
        textarea.value = JSON.stringify(data, null, 2);
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Invite info copied to clipboard!");
      };

      // Append the copy button
      inviteInfoDiv.appendChild(copyBtn);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById("inviteInfo").innerText = "Error retrieving invite info. Please check the invite link and try again.";
    });
}