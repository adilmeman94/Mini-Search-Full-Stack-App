import { useState } from "react";
import "./App.css";
import type { KeyboardEvent } from "react";
import useSearchQuery from "./hooks/useSearchquery";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function App() {
  const [query, setQuery] = useState("");

  const { mutate: search, data, isPending, isError, error } = useSearchQuery();

  const handleSearch = () => {
    search(query);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Task A: Mini Full-Stack Search
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Search a local FAQs dataset with basic keyword scoring.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search"
          placeholder="Try: trust badges, form above the fold, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          size="medium"
        />
        <Button variant="contained" onClick={handleSearch} disabled={isPending}>
          Search
        </Button>
      </Stack>

      {isPending && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">Searching…</Typography>
        </Box>
      )}

      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error?.message || "Something went wrong."}
        </Alert>
      )}

      {data && (
        <Box sx={{ mt: 2 }}>
          {data.summary && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Summary
              </Typography>
              <Typography variant="body2">{data.summary}</Typography>
              {data.sources && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  Sources: [{data.sources.join(", ")}]
                </Typography>
              )}
            </Alert>
          )}

          {data.results.length === 0 ? (
            <Alert severity="warning">
              {data.message || "No matches found."}
            </Alert>
          ) : (
            <Stack spacing={2}>
              {data.results.map((r) => (
                <Card key={r.id} variant="outlined">
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="baseline"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Typography variant="h6" sx={{ mb: 0 }}>
                        {r.title}
                      </Typography>
                      <Chip size="small" label={`score: ${r.score}`} />
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      {r.snippet}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Container>
  );
}
