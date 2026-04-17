#!/bin/sh

set -e

APP_CONFIG_FILE="${NGINX_ENVSUBST_OUTPUT_DIR}/app.config.json"

# Escape special sed characters in replacement strings:
# - & means "matched text" in sed, must be escaped as \&
# - / is the sed delimiter, must be escaped as \/
escape_for_sed() {
  local value="$1"
  value="${value//&/\\&}"
  value="${value//\//\\/}"
  echo "$value"
}

if [ -n "${APP_CONFIG_AUTH_TYPE}" ]; then
  echo "SET APP_CONFIG_AUTH_TYPE"

  encoded=$(escape_for_sed "$APP_CONFIG_AUTH_TYPE")
  sed -e "s/\"authType\": \".*\"/\"authType\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_PROVIDER}" ]; then
  echo "SET APP_CONFIG_PROVIDER"

  encoded=$(escape_for_sed "$APP_CONFIG_PROVIDER")
  sed -e "s/\"providers\": \".*\"/\"providers\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_IDENTITY_HOST}" ]; then
  echo "SET APP_CONFIG_IDENTITY_HOST"

  encoded=$(escape_for_sed "$APP_CONFIG_IDENTITY_HOST")
  sed -e "s/\"identityHost\": \".*\"/\"identityHost\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_HOST}" ]; then
  echo "SET APP_CONFIG_OAUTH2_HOST"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_HOST")
  sed -e "s/\"host\": \".*\"/\"host\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_CLIENTID}" ]; then
  echo "SET APP_CONFIG_OAUTH2_CLIENTID"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_CLIENTID")
  sed -e "s/\"clientId\": \".*\"/\"clientId\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_IMPLICIT_FLOW}" ]; then
  echo "SET APP_CONFIG_OAUTH2_IMPLICIT_FLOW"

  sed -e "s/\"implicitFlow\": [^,]*/\"implicitFlow\": ${APP_CONFIG_OAUTH2_IMPLICIT_FLOW}/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_CODE_FLOW}" ]; then
  echo "SET APP_CONFIG_OAUTH2_CODE_FLOW"

  sed -e "s/\"codeFlow\": [^,]*/\"codeFlow\": ${APP_CONFIG_OAUTH2_CODE_FLOW}/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_SILENT_LOGIN}" ]; then
  echo "SET APP_CONFIG_OAUTH2_SILENT_LOGIN"

  sed -e "s/\"silentLogin\": [^,]*/\"silentLogin\": ${APP_CONFIG_OAUTH2_SILENT_LOGIN}/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_LOGOUT_URL}" ]; then
  echo "SET APP_CONFIG_OAUTH2_LOGOUT_URL"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_LOGOUT_URL")
  sed -e "s/\"logoutUrl\": \".*\"/\"logoutUrl\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_LOGOUT_PARAMETERS}" ]; then
  echo "SET APP_CONFIG_OAUTH2_LOGOUT_PARAMETERS"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_LOGOUT_PARAMETERS")
  sed -e "s/\"logoutParameters\": \".*\"/\"logoutParameters\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_AUDIENCE}" ]; then
  echo "SET APP_CONFIG_OAUTH2_AUDIENCE"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_AUDIENCE")
  sed -e "s/\"audience\": \".*\"/\"audience\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI}" ]; then
  echo "SET APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI")
  sed -e "s/\"redirectSilentIframeUri\": \".*\"/\"redirectSilentIframeUri\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_REDIRECT_LOGIN}" ]; then
  echo "SET APP_CONFIG_OAUTH2_REDIRECT_LOGIN"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_REDIRECT_LOGIN")
  sed -e "s/\"redirectUri\": \".*\"/\"redirectUri\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_OAUTH2_REDIRECT_LOGOUT}" ]; then
  echo "SET APP_CONFIG_OAUTH2_REDIRECT_LOGOUT"

  encoded=$(escape_for_sed "$APP_CONFIG_OAUTH2_REDIRECT_LOGOUT")
  sed -e "s/\"redirectUriLogout\": \".*\"/\"redirectUriLogout\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [[ -n "${APP_CONFIG_BPM_HOST}" ]]; then
  echo "SET APP_CONFIG_BPM_HOST"

  encoded=$(escape_for_sed "$APP_CONFIG_BPM_HOST")
  sed -e "s/\"bpmHost\": \".*\"/\"bpmHost\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [[ -n "${APP_CONFIG_ECM_HOST}" ]]; then
  echo "SET APP_CONFIG_ECM_HOST"

  encoded=$(escape_for_sed "$APP_CONFIG_ECM_HOST")
  sed -e "s/\"ecmHost\": \".*\"/\"ecmHost\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_ITOP_PEOPLE_ENDPOINT}" ]; then
  echo "SET APP_CONFIG_ITOP_PEOPLE_ENDPOINT"

  encoded=$(escape_for_sed "$APP_CONFIG_ITOP_PEOPLE_ENDPOINT")
  sed -e "s/\"peopleEndpoint\": \".*\"/\"peopleEndpoint\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_BASE_SHARE_URL}" ]; then
  echo "SET APP_BASE_SHARE_URL"

  encoded=$(escape_for_sed "$APP_BASE_SHARE_URL")
  sed -e "s/\"baseShareUrl\": \".*\"/\"baseShareUrl\": \"${encoded}\"/g" \
    -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_PLUGIN_TAGS}" ]; then
  echo "SET APP_CONFIG_PLUGIN_TAGS"
  sed -e "s/\"tagsEnabled\": [^,]*/\"tagsEnabled\": ${APP_CONFIG_PLUGIN_TAGS}/g" -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_PLUGIN_CATEGORIES}" ]; then
  echo "SET APP_CONFIG_PLUGIN_CATEGORIES"
  sed -e "s/\"categoriesEnabled\": [^,]*/\"categoriesEnabled\": ${APP_CONFIG_PLUGIN_CATEGORIES}/g" -i "$APP_CONFIG_FILE"
fi

if [ -n "${APP_CONFIG_PLUGIN_KNOWLEDGE_RETRIEVAL}" ]; then
  echo "SET APP_CONFIG_PLUGIN_KNOWLEDGE_RETRIEVAL"
  sed -e "s/\"knowledgeRetrievalEnabled\": [^,]*/\"knowledgeRetrievalEnabled\": ${APP_CONFIG_PLUGIN_KNOWLEDGE_RETRIEVAL}/g" -i "$APP_CONFIG_FILE"
fi